const strictRules = {
  canonical: { self_reference: true },
  headings: { no_skip: true },
  html_basics: { meta_description_required: true },
  opengraph: {
    require_og_title: true,
    require_og_description: true,
    require_og_image: true,
  },
  a11y: {
    require_skip_link: true,
    img_alt_required: true,
    button_name_required: true,
    label_for_required: true,
  },
  links: { check_fragments: true },
  sitemap: {
    require: true,
    canonical_must_be_in_sitemap: true,
    entries_must_exist_in_dist: true,
  },
  security: { check_target_blank: true },
  hreflang: {
    check_hreflang: true,
    require_x_default: true,
    require_self_reference: true,
    require_reciprocal: true,
  },
  assets: { check_broken_assets: true },
  structured_data: { check_json_ld: true },
  content_quality: {
    detect_duplicate_titles: true,
    detect_duplicate_descriptions: true,
    detect_duplicate_h1: true,
  },
};

interface StrictPostAuditOptions {
  exclude?: string[];
}

export function createStrictPostAuditOptions({ exclude = [] }: StrictPostAuditOptions = {}) {
  return {
    failOn: 'errors',
    hints: { sourceFiles: true },
    rules: {
      filters: { exclude },
      ...strictRules,
    },
  };
}
