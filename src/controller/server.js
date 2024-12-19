export const health_check = async (req, res) => {
  try {
    return res.status(200).send(true);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}
