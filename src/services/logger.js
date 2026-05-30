export function logger(message, data) {
  const timestamp = new Date().toISOString();

  console.log("[LOG]");
  console.log(timestamp);
  console.log(message);

  if (data) {
    console.log(data);
  }
}

export function logError(message, error) {
  const timestamp = new Date().toISOString();

  console.error("[LOG]");
  console.error(timestamp);
  console.error(message);
  console.error(error);
}
