// import React, { useState } from 'react';
import { useAtom } from 'jotai';
import yaml from 'js-yaml';

import { OpenApiDataTypes } from '../../types/OpenApiTypes';
import { openApiDataAtom, errorAtom, yamlTextAtom } from '../../store/atoms';

export const useOpenApiRender = () => {
  //   const [openApiData, setOpenApiData] = useState<OpenApiDataTypes | null>(null);
  //   const [error, setError] = useState<string | null>(null);
  //   const [yamlText, setYamlText] = useState<string>('');

  const [openApiData, setOpenApiData] = useAtom(openApiDataAtom);
  const [error, setError] = useAtom(errorAtom);
  const [yamlText, setYamlText] = useAtom(yamlTextAtom);

  const handleYamlInput = (data: string) => {
    try {
      const yamlData = yaml.load(data) as OpenApiDataTypes;
      setOpenApiData(yamlData);
      setError(null);
    } catch (err) {
      setError('Error parsing YAML.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleYamlInput(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setYamlText(event.target.value);
    handleYamlInput(event.target.value);
  };

  const renderPaths = () => {
    if (!openApiData?.paths) return <p>Paths not found.</p>;

    return Object.entries(openApiData.paths).map(([path, methods]) => (
      <div key={path} className="pathContainer">
        <h3>Path: {path}</h3>
        {Object.entries(methods).map(([method, details]) => (
          <div key={method} className="methodDetails">
            <h4>Method: {method.toUpperCase()}</h4>
            <p>
              <strong>Summary:</strong> {details.summary || 'N/A'}
            </p>
            <p>
              <strong>Description:</strong> {details.description || 'N/A'}
            </p>
            <h5>Parameters:</h5>
            <ul className="list">
              {(details.parameters || []).map((param, index) => (
                <li key={index} className="listItem">
                  {param.$ref ? `Reference: ${param.$ref}` : `${param.name} (${param.in})`}{' '}
                </li>
              ))}
            </ul>
            <h5>Responses:</h5>
            <ul className="list">
              {details.responses?.['200'] ? (
                <li className="listItem">
                  <strong>200:</strong> {details.responses['200'].description || 'No description'}
                </li>
              ) : (
                <li className="listItem">No 200 response defined.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    ));
  };

  return { openApiData, error, yamlText, handleFileUpload, handleTextChange, renderPaths };
};
