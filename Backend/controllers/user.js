exports.pongtest = async (req, res) => {
    try {
        res.send({
          message: "Pong",
        });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };