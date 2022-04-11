export function assertEq(one, two) {
  const isEq =
    JSON.stringify(one) === JSON.stringify(two);
  if (!isEq) {
    console.error(`${one} !== ${two}`);
    return;
  }

  console.log('success');
}
