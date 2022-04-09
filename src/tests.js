export function assertObEq(one, two) {
  const isEq = JSON.stringify(one) === JSON.stringify(two);
  if (!isEq) {
    console.error(`${one} !== ${two}`);
    return;
  }

  console.log("success");
}

export function assertPremitive(one, two) {
  const isEq = one === two;
  if (!isEq) {
    console.error(`${one} !== ${two}`);
    return;
  }

  console.log("success");
}
