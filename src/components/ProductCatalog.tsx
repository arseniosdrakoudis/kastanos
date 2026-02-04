"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/i18n";

interface ProductCatalogProps {
  products: Product[];
  sexOptions: string[];
  subCategoryOptions: string[];
  materialOptions: string[];
  initialProductType?: string;
}

interface FilterState {
  search: string;
  sex: string[];
  subCategory: string[];
  material: string[];
}

function ProductCard({
  product,
  index,
  translations,
}: {
  product: Product;
  index: number;
  translations: { categoryLabel: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <Card className="group overflow-hidden border-border/50 hover:border-champagne/30 transition-all duration-300 bg-card card-hover-lift">
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <Badge
              variant="secondary"
              className="mb-2 text-xs font-normal bg-champagne/10 text-champagne border-0"
            >
              {translations.categoryLabel}
            </Badge>
            <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
              {product.name}
            </h3>
            {product.price && (
              <p className="text-muted-foreground text-sm">{product.price}</p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
        isActive
          ? "bg-champagne text-white border-champagne"
          : "bg-background border-border hover:border-champagne/50 text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSection({
  filters,
  setFilters,
  sexOptions,
  subCategoryOptions,
  materialOptions,
  translations,
}: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  sexOptions: string[];
  subCategoryOptions: string[];
  materialOptions: string[];
  translations: {
    sexLabel: string;
    categoryLabel: string;
    materialLabel: string;
    clearFilters: string;
    sexOptions: Record<string, string>;
    subCategoryOptions: Record<string, string>;
    materialOptions: Record<string, string>;
  };
}) {
  const toggleSex = (sex: string) => {
    const newSex = filters.sex.includes(sex)
      ? filters.sex.filter((s) => s !== sex)
      : [...filters.sex, sex];
    setFilters({ ...filters, sex: newSex });
  };

  const toggleSubCategory = (subCat: string) => {
    const newSubCat = filters.subCategory.includes(subCat)
      ? filters.subCategory.filter((s) => s !== subCat)
      : [...filters.subCategory, subCat];
    setFilters({ ...filters, subCategory: newSubCat });
  };

  const toggleMaterial = (mat: string) => {
    const newMat = filters.material.includes(mat)
      ? filters.material.filter((m) => m !== mat)
      : [...filters.material, mat];
    setFilters({ ...filters, material: newMat });
  };

  const hasActiveFilters = filters.sex.length > 0 || filters.subCategory.length > 0 || filters.material.length > 0;

  return (
    <div className="space-y-6">
      {/* Sex Filter */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {translations.sexLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {sexOptions.map((sex) => (
            <FilterButton
              key={sex}
              label={translations.sexOptions[sex] || sex}
              isActive={filters.sex.includes(sex)}
              onClick={() => toggleSex(sex)}
            />
          ))}
        </div>
      </div>

      {/* SubCategory Filter */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {translations.categoryLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {subCategoryOptions.map((subCat) => (
            <FilterButton
              key={subCat}
              label={translations.subCategoryOptions[subCat] || subCat}
              isActive={filters.subCategory.includes(subCat)}
              onClick={() => toggleSubCategory(subCat)}
            />
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {translations.materialLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {materialOptions.map((mat) => (
            <FilterButton
              key={mat}
              label={translations.materialOptions[mat] || mat}
              isActive={filters.material.includes(mat)}
              onClick={() => toggleMaterial(mat)}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => setFilters({ ...filters, sex: [], subCategory: [], material: [] })}
          className="text-sm text-champagne hover:text-champagne/80 flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          {translations.clearFilters}
        </button>
      )}
    </div>
  );
}

export function ProductCatalogContent({
  products,
  sexOptions,
  subCategoryOptions,
  materialOptions,
  initialProductType,
}: ProductCatalogProps) {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Pre-filter products based on initialProductType if provided
    return {
      search: "",
      sex: [],
      subCategory: [],
      material: [],
    };
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useLanguage();

  // Filter products - first by initialProductType (from URL), then by user filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // First, filter by initialProductType (from category page navigation)
      if (initialProductType && product.productType !== initialProductType) {
        return false;
      }
      // Search filter
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Sex filter
      if (filters.sex.length > 0 && !filters.sex.includes(product.sex)) {
        return false;
      }
      // SubCategory filter
      if (
        filters.subCategory.length > 0 &&
        (!product.subCategory || !filters.subCategory.includes(product.subCategory))
      ) {
        return false;
      }
      // Material filter - check if any selected material is in the product's materials array
      if (
        filters.material.length > 0 &&
        !filters.material.some((mat) => product.details.materials.includes(mat))
      ) {
        return false;
      }
      return true;
    });
  }, [products, filters, initialProductType]);

  // Calculate the total products in the current category (for displaying "X of Y category")
  const categoryTotal = useMemo(() => {
    if (initialProductType) {
      return products.filter(p => p.productType === initialProductType).length;
    }
    return products.length;
  }, [products, initialProductType]);

  // Get the category label for display
  const getProductTypeName = () => {
    if (!initialProductType) return t.catalogPage.products;
    const typeMap: Record<string, string> = {
      Ring: t.nav.rings,
      Necklace: t.nav.necklaces,
      Earrings: t.nav.earrings,
      Bracelet: t.nav.braceletswatches,
    };
    return typeMap[initialProductType] || t.catalogPage.products;
  };

  const getCategoryLabel = () => {
    return t.productCategories.jewellery;
  };

  const activeFilterCount = filters.sex.length + filters.subCategory.length + filters.material.length;

  const filterTranslations = {
    sexLabel: t.catalogPage.sexLabel,
    categoryLabel: t.catalogPage.categoryLabel,
    materialLabel: t.catalogPage.materialLabel,
    clearFilters: t.catalogPage.clearFilters,
    sexOptions: t.catalogPage.sexOptions,
    subCategoryOptions: t.catalogPage.subCategoryOptions,
    materialOptions: t.catalogPage.materialOptions,
  };
  // Get category-specific title and description
  const getPageTitle = () => {
    if (!initialProductType) return t.catalogPage.jewelleryTitle;
    const titleMap: Record<string, string> = {
      Ring: t.catalogPage.categoryTitles?.rings || t.nav.rings,
      Necklace: t.catalogPage.categoryTitles?.necklaces || t.nav.necklaces,
      Earrings: t.catalogPage.categoryTitles?.earrings || t.nav.earrings,
      Bracelet: t.catalogPage.categoryTitles?.bracelets || t.nav.braceletswatches,
    };
    return titleMap[initialProductType] || t.catalogPage.jewelleryTitle;
  };

  const getPageDescription = () => {
    if (!initialProductType) return t.catalogPage.jewelleryDescription;
    const descMap: Record<string, string> = {
      Ring: t.catalogPage.categoryDescriptions?.rings || t.catalogPage.jewelleryDescription,
      Necklace: t.catalogPage.categoryDescriptions?.necklaces || t.catalogPage.jewelleryDescription,
      Earrings: t.catalogPage.categoryDescriptions?.earrings || t.catalogPage.jewelleryDescription,
      Bracelet: t.catalogPage.categoryDescriptions?.bracelets || t.catalogPage.jewelleryDescription,
    };
    return descMap[initialProductType] || t.catalogPage.jewelleryDescription;
  };

  const pageTitle = getPageTitle();
  const pageDescription = getPageDescription();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
              {t.catalogPage.sectionLabel}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search and Filter Bar */}
          <div className="bg-card rounded-xl border border-border/50 p-4 md:p-6 mb-8 shadow-sm">
            {/* Top Row: Search + Mobile Filter Button */}
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.catalogPage.searchPlaceholder}
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne transition-all"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="lg" className="gap-2 shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                    {activeFilterCount > 0 && (
                      <Badge className="bg-champagne text-white text-xs px-1.5 py-0.5">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background">
                  <SheetTitle className="font-serif text-xl mb-6">
                    {t.catalogPage.filters}
                  </SheetTitle>
                  <FilterSection
                    filters={filters}
                    setFilters={setFilters}
                    sexOptions={sexOptions}
                    subCategoryOptions={subCategoryOptions}
                    materialOptions={materialOptions}
                    translations={filterTranslations}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Filters Row */}
            <div className="hidden md:flex flex-wrap items-center gap-6">
              {/* Sex Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {t.catalogPage.sexLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sexOptions.map((sex) => (
                    <FilterButton
                      key={sex}
                      label={filterTranslations.sexOptions[sex as keyof typeof filterTranslations.sexOptions] || sex}
                      isActive={filters.sex.includes(sex)}
                      onClick={() => {
                        const newSex = filters.sex.includes(sex)
                          ? filters.sex.filter((s) => s !== sex)
                          : [...filters.sex, sex];
                        setFilters({ ...filters, sex: newSex });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-border" />

              {/* SubCategory Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {t.catalogPage.categoryLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {subCategoryOptions.map((subCat) => (
                    <FilterButton
                      key={subCat}
                      label={filterTranslations.subCategoryOptions[subCat as keyof typeof filterTranslations.subCategoryOptions] || subCat}
                      isActive={filters.subCategory.includes(subCat)}
                      onClick={() => {
                        const newSubCat = filters.subCategory.includes(subCat)
                          ? filters.subCategory.filter((s) => s !== subCat)
                          : [...filters.subCategory, subCat];
                        setFilters({ ...filters, subCategory: newSubCat });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-border" />

              {/* Material Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {t.catalogPage.materialLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {materialOptions.map((mat) => (
                    <FilterButton
                      key={mat}
                      label={filterTranslations.materialOptions[mat as keyof typeof filterTranslations.materialOptions] || mat}
                      isActive={filters.material.includes(mat)}
                      onClick={() => {
                        const newMat = filters.material.includes(mat)
                          ? filters.material.filter((m) => m !== mat)
                          : [...filters.material, mat];
                        setFilters({ ...filters, material: newMat });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <>
                  <div className="h-6 w-px bg-border" />
                  <button
                    onClick={() => setFilters({ search: "", sex: [], subCategory: [], material: [] })}
                    className="text-sm text-champagne hover:text-champagne/80 flex items-center gap-1 font-medium"
                  >
                    <X className="w-3 h-3" />
                    {t.catalogPage.clearFilters}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            {t.catalogPage.showingResults
              .replace("{count}", filteredProducts.length.toString())
              .replace("{total}", categoryTotal.toString())
              .replace("{category}", getProductTypeName())}
          </p>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  translations={{
                    categoryLabel: getCategoryLabel(),
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t.catalogPage.noResults}
              </p>
              <button
                onClick={() => setFilters({ search: "", sex: [], subCategory: [], material: [] })}
                className="mt-4 text-champagne hover:text-champagne/80 font-medium"
              >
                {t.catalogPage.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>


    </>
  );
}
