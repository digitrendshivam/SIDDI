import catalog from './products.json';
import type { ApplicationArea, Product, ProductFinish } from '../types';

export const FINISHES = catalog.finishes as ProductFinish[];

const downloadedDemoImages: Record<string, Record<string, string>> = {
  'door-handles-knobs': {
    'matte-black': '/Matte Black Knurled Door Lever.png',
    'brushed-brass': '/Brushed Metal Door Lever Handle.png',
    'satin-steel': '/Satin Knurled Stainless Door Lever.png',
    'polished-chrome': '/Polished Chrome Knurled Door Lever.png',
    gunmetal: '/Modern Gunmetal Knurled Door Handle.png',
    'antique-bronze': '/Antique Bronze Knurled Door Lever.png',
  },
  'door-hardware-accessories': {
    'matte-black': '/Flush Button.jpg',
    'brushed-brass': '/brass-door-handle.jpg',
    'satin-steel': '/03_door_hardware_accessories.png',
    'polished-chrome': '/03_door_hardware_accessories.png',
    gunmetal: '/Flush Button.jpg',
    'antique-bronze': '/03_door_hardware_accessories.png',
  },
  'bathroom-accessories': {
    'matte-black': '/Matte Black Faucet.jpg',
    'brushed-brass': '/Brushed Gold Basin Faucet.jpg',
    'satin-steel': '/Bathroom Accessory Kit.jpg',
    'polished-chrome': '/Bathroom Accessory Kit.jpg',
    gunmetal: '/Matte Black Faucet.jpg',
    'antique-bronze': '/Brushed Gold Basin Faucet.jpg',
  },
  'towel-rails-holders': {
    'matte-black': '/04_towel_rails_holders.png',
    'brushed-brass': '/Bathroom Accessory Kit.jpg',
    'satin-steel': '/04_towel_rails_holders.png',
    'polished-chrome': '/04_towel_rails_holders.png',
    gunmetal: '/bathroom kit.jpg',
    'antique-bronze': '/Bathroom Accessory Kit.jpg',
  },
  'hooks-utility': {
    'matte-black': '/05_hooks_robe_hooks_utility.png',
    'brushed-brass': '/05_hooks_robe_hooks_utility.png',
    'satin-steel': '/05_hooks_robe_hooks_utility.png',
    'polished-chrome': '/05_hooks_robe_hooks_utility.png',
    gunmetal: '/05_hooks_robe_hooks_utility.png',
    'antique-bronze': '/05_hooks_robe_hooks_utility.png',
  },
  'architectural-hardware': {
    'matte-black': '/Handle.jpg',
    'brushed-brass': '/brass-door-handle.jpg',
    'satin-steel': '/Handles.jpg',
    'polished-chrome': '/Handles.jpg',
    gunmetal: '/Knobs.jpg',
    'antique-bronze': '/Handles.jpg',
  },
};

const productSpecificDefaults: Record<string, string> = {
  'verona-architectural-lever-handle': '/Luxury Brass and Black Cabinet Hardware.png',
  'kyoto-minimalist-round-lever': '/Knurled Brass Lever on Walnut Door.png',
  'astrid-knurled-mortise-knob': '/01_door_handles_knobs.png',
  'silent-magnetic-mortise-lockset': '/Luxury Matte Black Flush Plate.png',
  'nordic-wall-mounted-soap-dispenser': '/Luxury Matte Black Waterfall Faucet.png',
  'solis-toilet-paper-holder-shelf': '/Luxury Matte Black Bathroom Holder.png',
  'linea-single-towel-rail-600': '/Luxury Bathroom Towel Rail Display.png',
  'pillar-architectural-robe-hook': '/Matte Black Hooks on Marble.png',
  'bauhaus-cabinet-edge-pull': '/Luxury Black and Brass Cabinet Pulls.png',
  'modena-entry-pull-handle': '/Modern Gunmetal Knurled Door Handle.png',
  'concealed-3d-adjustable-hinge': '/03_door_hardware_accessories.png',
  'flush-floor-magnetic-door-stop': '/Flush Button.jpg',
  'vertex-shower-corner-caddy': '/02_bathroom_accessories.png',
  'linea-double-towel-rail-800': '/Luxury Bathroom Towel Rail Display.png',
  'aero-cylindrical-towel-ring': '/Bathroom Accessory Kit.jpg',
  'prism-double-robe-hook': '/Matte Black Hooks on Marble.png',
  'heavy-duty-pivot-door-hinge-system': '/03_door_hardware_accessories.png',
};

export const DEMO_PRODUCTS = (catalog.products as Product[]).map((product) => {
  const categoryImages = downloadedDemoImages[product.categorySlug] ?? downloadedDemoImages['door-handles-knobs'];
  const specificFallback = productSpecificDefaults[product.slug];

  const imagesByFinish: Record<string, string> = {};
  product.finishes.forEach((finish) => {
    // 1. If product has explicit image for this finish in catalog.json
    if (product.imagesByFinish?.[finish.id]) {
      imagesByFinish[finish.id] = product.imagesByFinish[finish.id];
    }
    // 2. Specific product hero image for brushed-brass if applicable
    else if (finish.id === 'brushed-brass' && specificFallback && specificFallback.includes('Brass')) {
      imagesByFinish[finish.id] = specificFallback;
    }
    // 3. Category image for this finish (dedicated real color-matched photo)
    else if (categoryImages[finish.id]) {
      imagesByFinish[finish.id] = categoryImages[finish.id];
    }
    // 4. Fallback
    else {
      imagesByFinish[finish.id] = specificFallback ?? product.images[0] ?? '/brass-door-handle.jpg';
    }
  });

  const finishImages = product.finishes.map((f) => imagesByFinish[f.id]).filter(Boolean);
  const initialImages = specificFallback
    ? [specificFallback, ...finishImages]
    : finishImages.length
      ? finishImages
      : ['/brass-door-handle.jpg'];

  return {
    ...product,
    imagesByFinish,
    images: [...new Set(initialImages)],
  };
});
export const APPLICATION_AREAS = catalog.applications as ApplicationArea[];
