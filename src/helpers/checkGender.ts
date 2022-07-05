export const checkGender = (string: string): "male" | "female" => {
  const name = string.split(" ");

  return name[0][name[0].length - 1] === "a" ? "female" : "male";
};
