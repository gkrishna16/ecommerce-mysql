
export function getCart(req, res) {
  try {
    res.status(200).json(`this is the cart page.`);
  } catch (error) {
    res.status(500).json(error);
  }
}
