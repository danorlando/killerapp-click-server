const notFoundHandler = (request, response) => {
  const message = 'Not Found';

  response.status(404).json({ message });
};

export default notFoundHandler;
