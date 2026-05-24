export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function resizeTextarea(target: HTMLTextAreaElement) {
  target.style.height = "0px";
  target.style.height = `${Math.min(target.scrollHeight, 220)}px`;
}
