import * as airbnbExtended from "eslint-config-airbnb-extended";
import globals from "globals";

export default [
  ...(Array.isArray(airbnbExtended) ? airbnbExtended : (airbnbExtended.default || [])),
  {
    files: ["**/*.js"],
    
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    
    rules: {
      "class-methods-use-this": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "arrow-body-style": "off",
      "lines-between-class-members": "off", 
      "no-console": "off",
      "import/extensions": "off",
      "prefer-const": "error",      
      "no-unused-vars": "warn",     
      "no-param-reassign": ["error", { "props": false }] 
    }
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*", "webpack.config.js"]
  }
];
