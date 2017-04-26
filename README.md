# kv-formats
Convert between KV formats

https://j4db2yxkwh.execute-api.us-east-1.amazonaws.com/production/convert

```javascript
const kvFormats = require('kv-formats');
kvFormats.plist.stringify(
  kvFormats.yaml.parse(yamlFile)
);
```

## Formats supported
- JSON
- YAML
- TOML
- ini
- querystring
- plist
- msgpack
