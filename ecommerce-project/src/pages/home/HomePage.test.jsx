import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          },
          {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
              stars: 4.5,
              count: 56
            },
            priceCents: 799,
            keywords: ["tshirts", "apparel", "mens"]
          },
          {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/2-slot-toaster-white.jpg",
            name: "2 Slot Toaster - White",
            rating: {
              stars: 5,
              count: 2197
            },
            priceCents: 1899,
            keywords: ["toaster", "kitchen", "appliances"]
          }]
        };
      }
    });

    user = userEvent.setup();
  });

  it('displays the prducts correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(4);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1])
        .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();

    expect(
      within(productContainers[2])
        .getByText('Adults Plain Cotton T-Shirt - 2 Pack')
    ).toBeInTheDocument();

    expect(
      within(productContainers[3])
        .getByText('2 Slot Toaster - White')
    ).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');

    const addToCartButton1 = within(productContainers[0])
      .getByTestId('add-to-cart-button');
    await user.click(addToCartButton1);

    const addToCartButton2 = within(productContainers[1])
      .getByTestId('add-to-cart-button');
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    });
    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});