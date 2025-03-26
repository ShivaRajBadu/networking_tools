import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

// Function to parse traceroute output and stop at the final destination
function parseTracerouteOutput(output: string, destinationIP: string    ) {
  const lines = output.split("\n").filter((line) => line.trim() !== "");
  const hopLines = lines.slice(1);

  const hops = [];
  for (let line of hopLines) {
    const match = line.match(
      /^\s*(\d+)\s+(?:([^\s]+)\s+\(([^\)]+)\)|(\*))(?:\s+(\d+\.\d+)\s*ms)?/
    );

    if (!match) continue;

    const hop = {
      hop: parseInt(match[1], 10),
      hostname: match[2] || "*",
      ip: match[3] || "*",
      rtt: match[5] ? parseFloat(match[5]) : null,
    };

    hops.push(hop);

    // **Stop if this hop's IP matches the destination**
    if (hop.ip === destinationIP) break;
  }

  return hops;
}

export async function POST(request: Request) {
  try {
    const { hostname } = await request.json();
    if (!hostname) {
      return NextResponse.json(
        { error: "Hostname is required" },
        { status: 400 }
      );
    }

    // Validate hostname
    if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) {
      return NextResponse.json(
        { error: "Invalid hostname format" },
        { status: 400 }
      );
    }

    // **Resolve hostname to get destination IP**
    const resolveCmd =
      process.platform === "win32"
        ? `nslookup ${hostname} | findstr /R /C:"Address:"`
        : `dig +short ${hostname}`;
    const { stdout: resolveOutput } = await execPromise(resolveCmd);
    const destinationIP = resolveOutput.split("\n")[0].trim();

    if (!destinationIP || !/^\d+\.\d+\.\d+\.\d+$/.test(destinationIP)) {
      return NextResponse.json(
        { error: "Could not resolve hostname to IP" },
        { status: 400 }
      );
    }

    console.log(`Resolved ${hostname} to ${destinationIP}`);

    // **Traceroute command (adjusts for Windows)**
    const tracerouteCmd =
      process.platform === "win32"
        ? `tracert -d ${hostname}`
        : `traceroute  -q 1 -m 30 ${hostname}`;

    // Execute traceroute
    const { stdout } = await execPromise(tracerouteCmd);

    // Parse output and stop when destination is reached
    const hops = parseTracerouteOutput(stdout, destinationIP);

    // Fetch geolocation for each hop
    const hopsWithGeo = await Promise.all(
      hops.map(async (hop) => {
        if (hop.ip === "*") {
          return { ...hop, lat: null, lng: null, city: null, country: null };
        }

        try {
          const geoResponse = await fetch(`http://ip-api.com/json/${hop.ip}`);
          const geoData = await geoResponse.json();

          return {
            ...hop,
            lat: geoData.lat,
            lng: geoData.lon,
            city: geoData.city || "Unknown",
            country: geoData.country || "Unknown",
            network: geoData.network || "Unknown",
            asn: geoData.as || "Unknown",
            isp: geoData.isp || "Unknown",
          };
        } catch {
          return { ...hop, lat: null, lng: null, city: null, country: null };
        }
      })
    );

    return NextResponse.json({ hostname, destinationIP, hops: hopsWithGeo });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
