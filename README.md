# kv-formats
Convert between KV formats

## JavaScript
```javascript
const kvFormats = require('kv-formats');
kvFormats.plist.stringify(
  kvFormats.yaml.parse(yamlFile)
);
```

## HTTP
```
curl -XPOST -d @./package.json "https://j4db2yxkwh.execute-api.us-east-1.amazonaws.com/production/convert?outputType=ini&inputType=json"
```

## CLI
```
kv-formats -o toml ./package.json
```

## Formats supported
- `json`
- `yaml`
- `toml`
- `ini`
- `querystring`
- `plist`
- `msgpack`
