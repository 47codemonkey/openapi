import { render, screen } from '@testing-library/react';
import { OpenApiRender } from './openApiRender';
import '@testing-library/jest-dom';

test('renders OpenApiRender component', () => {
  render(<OpenApiRender />);
  expect(screen.getByText(/OpenAPI Render/i)).toBeInTheDocument();
});
