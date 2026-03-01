module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 7545,        // CỔNG GANACHE GUI (QUAN TRỌNG)
      network_id: "*"    // Cho phép mọi network id
    }
  },

  compilers: {
    solc: {
      version: "0.8.0"  // Phù hợp contract bạn đang dùng
    }
  }
};
