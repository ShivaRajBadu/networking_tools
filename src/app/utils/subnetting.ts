// IP Subnetting utility functions

// Helper function to convert IP to binary
const ipToBinary = (ip: string): string => {
  return ip.split('.')
    .map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('');
};

// Helper function to convert binary to IP
const binaryToIp = (binary: string): string => {
  const octets = [];
  for (let i = 0; i < 32; i += 8) {
    octets.push(parseInt(binary.substr(i, 8), 2));
  }
  return octets.join('.');
};

// Helper function to get CIDR from subnet mask
const maskToCidr = (mask: string): number => {
  return mask.split('.')
    .map(octet => parseInt(octet, 10).toString(2))
    .join('')
    .split('1').length - 1;
};

// Helper function to get subnet mask from CIDR
const cidrToMask = (cidr: number): string => {
  let binary = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
  return binaryToIp(binary);
};

// Helper function to get wildcard mask
const getWildcardMask = (mask: string): string => {
  return mask.split('.')
    .map(octet => 255 - parseInt(octet, 10))
    .join('.');
};

// Helper function to determine IP class
const getIpClass = (ip: string): string => {
  const firstOctet = parseInt(ip.split('.')[0], 10);
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E';
  return 'Unknown';
};

// Helper function to calculate network address
const calculateNetworkAddress = (ip: string, mask: string): string => {
  const ipBinary = ipToBinary(ip);
  const maskBinary = ipToBinary(mask);
  let networkBinary = '';
  
  for (let i = 0; i < 32; i++) {
    networkBinary += (parseInt(ipBinary[i], 10) & parseInt(maskBinary[i], 10)).toString();
  }
  
  return binaryToIp(networkBinary);
};

// Helper function to calculate broadcast address
const calculateBroadcastAddress = (networkAddress: string, wildcardMask: string): string => {
  const networkBinary = ipToBinary(networkAddress);
  const wildcardBinary = ipToBinary(wildcardMask);
  let broadcastBinary = '';
  
  for (let i = 0; i < 32; i++) {
    broadcastBinary += (parseInt(networkBinary[i], 10) | parseInt(wildcardBinary[i], 10)).toString();
  }
  
  return binaryToIp(broadcastBinary);
};

// Helper function to calculate usable host range
const calculateHostRange = (networkAddress: string, broadcastAddress: string): string => {
  const networkOctets = networkAddress.split('.').map(octet => parseInt(octet, 10));
  const broadcastOctets = broadcastAddress.split('.').map(octet => parseInt(octet, 10));
  
  // First host is network address + 1
  networkOctets[3] += 1;
  
  // Last host is broadcast address - 1
  broadcastOctets[3] -= 1;
  
  return `${networkOctets.join('.')} - ${broadcastOctets.join('.')}`;
};

// Helper function to calculate total number of hosts
const calculateTotalHosts = (cidr: number): number => {
  return Math.pow(2, 32 - cidr);
};

// Helper function to calculate usable hosts
const calculateUsableHosts = (cidr: number): number => {
  return Math.max(0, calculateTotalHosts(cidr) - 2);
};

// Calculate all possible networks for a given IP and CIDR
const calculateAllNetworks = (ip: string, cidr: number): any[] => {
  const networks = [];
  const ipOctets = ip.split('.').map(octet => parseInt(octet, 10));
  
  // Calculate the network increment based on CIDR
  let increment = 1;
  if (cidr <= 8) {
    increment = Math.pow(2, 8 - (cidr % 8));
  } else if (cidr <= 16) {
    increment = Math.pow(2, 16 - cidr);
  } else if (cidr <= 24) {
    increment = Math.pow(2, 24 - cidr);
  } else {
    increment = Math.pow(2, 32 - cidr);
  }
  
  // Determine which octet to increment based on CIDR
  let octetIndex = 0;
  if (cidr > 8 && cidr <= 16) {
    octetIndex = 1;
  } else if (cidr > 16 && cidr <= 24) {
    octetIndex = 2;
  } else if (cidr > 24) {
    octetIndex = 3;
  }
  
  // Calculate the base network address
  const subnetMask = cidrToMask(cidr);
  const wildcardMask = getWildcardMask(subnetMask);
  const baseNetworkAddress = calculateNetworkAddress(ip, subnetMask);
  const baseNetworkOctets = baseNetworkAddress.split('.').map(octet => parseInt(octet, 10));
  
  // Calculate the number of networks
  const numNetworks = Math.min(64, Math.pow(2, 32 - cidr)); // Limit to 64 networks for display
  
  // Generate all possible networks
  for (let i = 0; i < numNetworks; i++) {
    const networkOctets = [...baseNetworkOctets];
    
    // Calculate the network address for this iteration
    let value = i * increment;
    for (let j = 3; j >= octetIndex; j--) {
      const addValue = value % 256;
      networkOctets[j] = (baseNetworkOctets[j] + addValue) % 256;
      value = Math.floor(value / 256);
    }
    
    const networkAddress = networkOctets.join('.');
    const broadcastAddress = calculateBroadcastAddress(networkAddress, wildcardMask);
    const hostRange = calculateHostRange(networkAddress, broadcastAddress);
    
    networks.push({
      networkAddress,
      hostRange,
      broadcastAddress
    });
  }
  
  return networks;
};

export const calculateIPv4Subnet = (ip: string, mask: string, networkClass: string = 'Any') => {
  if (!ip || !mask) return [];

  // Convert mask to CIDR if it's in decimal format
  const cidr = mask.includes('.') ? maskToCidr(mask) : parseInt(mask.replace('/', ''), 10);
  const subnetMask = mask.includes('.') ? mask : cidrToMask(cidr);
  const wildcardMask = getWildcardMask(subnetMask);
  
  const networkAddress = calculateNetworkAddress(ip, subnetMask);
  const broadcastAddress = calculateBroadcastAddress(networkAddress, wildcardMask);
  const hostRange = calculateHostRange(networkAddress, broadcastAddress);
  const totalHosts = calculateTotalHosts(cidr);
  const usableHosts = calculateUsableHosts(cidr);
  const ipClass = getIpClass(ip);
  
  const result = {
    ipAddress: ip,
    networkAddress,
    broadcastAddress,
    hostRange,
    subnetMask,
    wildcardMask,
    cidrNotation: `/${cidr}`,
    totalHosts,
    usableHosts,
    ipClass: `Class ${ipClass}`,
    binarySubnetMask: ipToBinary(subnetMask),
    binaryId: ipToBinary(ip),
    hexId: `0x${parseInt(ipToBinary(ip), 2).toString(16)}`,
    ipType: parseInt(ip.split('.')[0], 10) < 224 ? 'Public' : 'Multicast',
    allNetworks: calculateAllNetworks(ip, cidr)
  };
  
  return [result];
};

export const calculateIPv6Subnet = (ip: string, prefixLength: number) => {
  if (!ip || isNaN(prefixLength)) return null;

  // Basic IPv6 calculation (simplified for now)
  const networkAddress = ip.split(':').slice(0, prefixLength / 16).join(':') + '::';
  const hostRange = `${networkAddress}1 - ${networkAddress}ffff:ffff:ffff:ffff`;
  
  return {
    ipAddress: ip,
    networkAddress,
    hostRange,
    prefixLength: `/${prefixLength}`,
    totalHosts: Math.pow(2, 128 - prefixLength),
  };
}; 