import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentImage extends Struct.ComponentSchema {
  collectionName: 'components_component_images';
  info: {
    displayName: 'Image';
    icon: 'landscape';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'dashboard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Component<'component.image', true>;
    link: Schema.Attribute.Component<'component.link', false> &
      Schema.Attribute.Required;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.Component<'component.link', false>;
    link_item: Schema.Attribute.Component<'component.link', true> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Component<'component.image', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.image': ComponentImage;
      'component.link': ComponentLink;
      'layout.hero-section': LayoutHeroSection;
      'layout.navbar': LayoutNavbar;
    }
  }
}
