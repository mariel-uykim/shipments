'use server'

export default async function getBase() {
    const headers = import('next/headers')
    const headersList = (await headers).headers()
    const baseURL = headersList.get('host')
    let scheme = ""

    const env = process.env.NODE_ENV
    if(env == "development"){
      scheme = "http://"
    }
    else if (env == "production"){
      scheme = "https://"
    }

    const base = scheme + baseURL
    return base
}