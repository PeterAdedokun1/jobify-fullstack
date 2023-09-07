import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
export async function comparePassword(password: string, hashPassword: string) {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch
}