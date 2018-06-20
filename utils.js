export function extractError(err, exception) {
  const errs = err.errors;
  let errors = [];
  for (const e in errs) {
    errors.push({
      [exception[e] ? exception[e] : errs[e].path]: errs[e].message
    });
  }
  console.log(errors);
  return errors;
}