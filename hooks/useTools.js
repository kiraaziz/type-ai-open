export function extractTextInCurlyBraces(text) {
    const regex = /\{([^}]*)\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
    }
    
    return matches;
}