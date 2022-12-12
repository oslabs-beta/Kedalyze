/**
 * @jest-environment jsdom
 */

 test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });


import React from 'react';
import { Link } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Namespaces from '../src/client/components/pages/data/Namespaces';

describe('Namespaces', () => {
  it('should render a list of namespace links', () => {
    render(<Namespaces />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(8);
    expect(links[0]).toHaveTextContent('Global');
    expect(links[0]).toHaveAttribute('href', '/dashboard/metrics/global');
    expect(links[1]).toHaveTextContent('API Server');
    expect(links[1]).toHaveAttribute('href', '/dashboard/metrics/apiServer');
  });
});