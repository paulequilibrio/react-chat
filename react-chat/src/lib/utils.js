export const onlyUser = fullJid => fullJid.replace(/@.*/, '')

export const onlyJid = fullJid => fullJid.replace(/\/.*/, '')

export const onlyResource = fullJid => fullJid.replace(/.*\//, '')
