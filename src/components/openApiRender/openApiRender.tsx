import { useOpenApiRender } from './useOpenApiRender';

import './openApiRender.css';

export const OpenApiRender = () => {
  const { openApiData, error, yamlText, handleFileUpload, handleTextChange, renderPaths } = useOpenApiRender();

  return (
    <div className="container">
      <h1>OpenAPI Render</h1>
      <input type="file" accept=".yaml,.yml" onChange={handleFileUpload} className="inputFile" />
      <br />
      <textarea value={yamlText} onChange={handleTextChange} placeholder="Paste OpenAPI YAML" className="textarea" />
      {error && <p className="error">{error}</p>}
      <div>{openApiData ? renderPaths() : <p>Upload or paste an OpenAPI specification.</p>}</div>
    </div>
  );
};
