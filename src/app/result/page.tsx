import React, { Suspense } from 'react'
import ResultPage from './ResultPage'

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultPage />
        </Suspense>
    )
}

export default page
