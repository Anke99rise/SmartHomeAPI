const mainURL = 'http://localhost:3000'

const config = {
  url: mainURL,
  port: 3001,
  
  // database
  database: {
    name: 'smart_api_database',
    username: 'root',
    password: '',
    options: {
      host: '127.0.0.1',
      dialect: 'mysql'
    }
  },

  defaultLanguage: 'en',
  
}

module.exports = config