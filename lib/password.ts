// The character set to use for password generation
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numberChars = "0123456789"
const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-="

/**
 * Generate a random password of a specified length
 * @param length Password length (default: 12)
 * @param options Password Generation Options
 * @returns Generated Password
 */
export const generatePassword = (length: number = 12, options: {
  includeLowercase?: boolean;
  includeUppercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
} = {}): string => {
  const {
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
  } = options

  let chars = ""
  if (includeLowercase) chars += lowercaseChars
  if (includeUppercase) chars += uppercaseChars
  if (includeNumbers) chars += numberChars
  if (includeSpecialChars) chars += specialChars

  if (chars.length === 0) {
    throw new Error("It must contain at least one character type.")
  }

  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }

  return password
}