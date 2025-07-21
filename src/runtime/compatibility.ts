export function isCompatible(requirement: string, hostVersion: string): boolean {
  const requiredMajor = Number(requirement.replace(/^\^/, "").split(".")[0]);
  const hostMajor = Number(hostVersion.split(".")[0]);
  return Number.isInteger(requiredMajor) && requiredMajor === hostMajor;
}
