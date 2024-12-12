type OpenApiParameterTypes = {
  name: string;
  in: string;
  $ref?: string;
};

type OpenApiPathType = {
  summary?: string;
  description?: string;
  parameters?: Array<OpenApiParameterTypes>;
  responses: {
    [status: string]: {
      description: string;
    };
  };
};

export type OpenApiDataTypes = {
  paths?: {
    [path: string]: {
      [method: string]: OpenApiPathType;
    };
  };
  components?: {
    parameters?: {
      [key: string]: {
        name: string;
        in: string;
        description?: string;
      };
    };
  };
};
