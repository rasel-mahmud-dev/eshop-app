export function getBrowserName(userAgent) {
    if (!userAgent) return "userAgent"
    userAgent = userAgent.toLowerCase()

    if (userAgent.includes('chrome') && userAgent.includes('Edg')) {
        return 'Edge';
    } else if (userAgent.includes('chrome')) {
        return 'Chrome';
    } else if (userAgent.includes('Safari') && userAgent.includes('AppleWebKit') && !userAgent.includes('chrome')) {
        return 'Safari';
    } else if (userAgent.includes('firefox')) {
        return 'Firefox';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
        return 'Internet Explorer';
    } else {
        return 'Unknown';
    }
}

export function getDeviceType(userAgent) {
    if (!userAgent) return "userAgent"
    userAgent = userAgent.toLowerCase()

    if (userAgent.includes('windows')) {
        return 'Windows';
    } else if (userAgent.includes('macintosh') || userAgent.includes('Mac OS X')) {
        return 'Mac';
    }  else if (userAgent.includes('android')) {
        return 'Android';
    } else if (userAgent.includes('linux')) {
        return 'Linux';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
        return 'iOS';
    } else {
        return 'Unknown';
    }
}


export function extractIPv4(ipv6Address) {
    if(!ipv6Address) return "Unknown"
    const ipv6Prefix = "::ffff:";
    if (ipv6Address.startsWith(ipv6Prefix)) {
        return ipv6Address.substring(ipv6Prefix.length);
    }
    return ipv6Address;
}


export function extractMobileModel(userAgent) {
    // Check if userAgent contains specific patterns for known devices
    if (userAgent.match(/iPhone/i)) {
        // Example for iPhone model extraction
        return userAgent.match(/\(([^)]+)\)/)[1].split(';')?.[1].trim();
    } else if (userAgent.match(/iPad/i)) {
        // Example for iPad model extraction
        return userAgent.match(/\(([^)]+)\)/)[1].split(';')?.[1].trim();
    } else if (userAgent.match(/Android/i)) {
        // Example for Android device extraction
        return userAgent.match(/Android\s([^\s;]+)/)?.[1];
    } else {
        // If no specific pattern matches, return a generic message or handle accordingly
        return "Unknown mobile model";
    }
}
