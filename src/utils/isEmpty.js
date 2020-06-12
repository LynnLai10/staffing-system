export default (test) => {
  if (test === "") return true; 
  if (test === "null") return true; 
  if (test === "undefined") return true; 
  if (!test && test !== 0 && test !== "") return true; 
  if (Array.prototype.isPrototypeOf(test) && test.length === 0) return true; 
  if (Object.prototype.isPrototypeOf(test) && Object.keys(test).length === 0)
    return true; 
  return false;
};
