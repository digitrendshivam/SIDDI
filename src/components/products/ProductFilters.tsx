import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { FINISHES, DEMO_PRODUCTS } from '../../data/products';
import {
  CaretDown,
  MagnifyingGlass,
  SlidersHorizontal,
  X,
} from '@phosphor-icons/react';

export interface Select2Option {
  value: string;
  label: string;
  count?: number;
  colorHex?: string;
}

interface Select2DropdownProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: Select2Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  multiple?: boolean;
  searchable?: boolean;
}

export const Select2Dropdown: React.FC<Select2DropdownProps> = ({
  values,
  onChange,
  options,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  className = '',
  multiple = false,
  searchable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Auto-focus search input when opened
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    } else {
      setSearchTerm('');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, searchable]);

  // Filter options based on live search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase().trim();
    return options.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [options, searchTerm]);

  // Toggle single option in multi-select
  const handleToggle = (val: string) => {
    if (multiple) {
      if (values.includes(val)) {
        onChange(values.filter((v) => v !== val));
      } else {
        onChange([...values, val]);
      }
    } else {
      onChange([val]);
      setIsOpen(false);
    }
  };

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allFilteredVals = filteredOptions.map((opt) => opt.value);
    const merged = Array.from(new Set([...values, ...allFilteredVals]));
    onChange(merged);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const isFiltered = values.length > 0;

  // Determine trigger label display
  const getTriggerDisplay = () => {
    if (!isFiltered) return <span>{placeholder}</span>;

    if (!multiple) {
      const selected = options.find((opt) => opt.value === values[0]);
      return <span>{selected ? selected.label : placeholder}</span>;
    }

    if (values.length === 1) {
      const selected = options.find((opt) => opt.value === values[0]);
      return (
        <span className="font-semibold text-[#946B00]">
          {selected ? selected.label : placeholder}
        </span>
      );
    }

    // Multiple selected
    const baseWord = placeholder.replace(/^All\s+/i, '');
    return (
      <span className="flex items-center gap-1.5 font-semibold text-[#946B00]">
        <span>{baseWord}</span>
        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono font-bold bg-[#AD8143] text-white rounded-full">
          {values.length}
        </span>
      </span>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button - Height 42-44px */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[42px] h-[42px] px-3 bg-white rounded-lg text-xs font-medium text-left transition-all flex items-center justify-between gap-2 cursor-pointer shadow-2xs ${
          isOpen
            ? 'border-[#AD8143] ring-2 ring-[#AD8143]/20 border'
            : isFiltered
            ? 'border-[#AD8143] border bg-[#FAF6EE]/80 text-[#946B00]'
            : 'border border-[#E2DFD7] text-[#18181B] hover:border-stone-400 hover:bg-stone-50'
        }`}
      >
        <div className="flex-1 whitespace-normal break-normal leading-tight line-clamp-2 min-w-0">
          {getTriggerDisplay()}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Quick Clear Button on Trigger */}
          {isFiltered && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClearAll}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onChange([]);
                }
              }}
              title="Clear selection"
              className="p-0.5 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X size={11} weight="bold" />
            </span>
          )}

          {/* Animated Chevron */}
          <CaretDown
            size={13}
            weight="bold"
            className={`text-stone-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#946B00]' : ''
            }`}
          />
        </div>
      </button>

      {/* Select2 Open Drawer - EXACT SAME WIDTH AS TRIGGER (w-full min-w-full) */}
      {isOpen && (
        <div
          role="listbox"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="absolute left-0 top-full mt-1.5 w-full min-w-full bg-white border border-[#E2DFD7] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.16)] z-50 overflow-hidden"
        >
          {/* Search & Select All Section (Fixed at top, does not scroll) */}
          {searchable && (
            <div className="p-2 border-b border-[#EAE6DE] bg-[#FAF8F5]">
              {/* Search input: height 32px, clean focus border directly on field with ZERO spacing/outer gap */}
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
                  <MagnifyingGlass size={13} weight="bold" />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  style={{ outline: 'none', outlineOffset: 0 }}
                  className="select2-search-input w-full h-8 pl-8 pr-6 text-xs bg-white border border-[#E2DFD7] rounded-md text-stone-800 placeholder:text-stone-400 focus:border-[#AD8143] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X size={10} weight="bold" />
                  </button>
                )}
              </div>

              {/* Select All Row: height 30-32px */}
              {multiple && (
                <div className="h-8 px-1 flex items-center justify-between text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-[#946B00] hover:text-[#7A5800] font-semibold cursor-pointer transition-colors"
                  >
                    Select all ({filteredOptions.length})
                  </button>
                  {values.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-stone-500 hover:text-red-600 cursor-pointer transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Category List: Height ~130-150px, Scrollable without moving Search or Footer, fully interactive scrolling with Lenis prevented */}
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
            className="max-h-[140px] overflow-y-auto overscroll-contain dropdown-scrollbar divide-y divide-[#EAE6DE]"
          >
            {filteredOptions.length === 0 ? (
              <div className="py-4 px-3 text-center text-xs text-stone-500">
                No matching options found.
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = values.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleToggle(opt.value)}
                    className={`w-full text-left min-h-[38px] py-2 px-3 text-[13px] leading-[18px] transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF6EE] text-[#946B00] font-medium'
                        : 'text-[#18181B] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {/* Category name aligned to left */}
                    <span className="flex-1 whitespace-normal break-normal min-w-0">
                      {opt.label}
                    </span>

                    {/* Count badge aligned to right */}
                    {opt.count !== undefined && (
                      <span className="text-[11px] font-mono text-[#78716C] bg-[#F4F3EF] px-1.5 py-0.5 rounded shrink-0">
                        {opt.count}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer (Fixed at bottom: height 38-42px, does not scroll with list) */}
          {multiple && (
            <div className="h-10 px-3 border-t border-[#EAE6DE] bg-[#FAF8F5] flex items-center justify-between">
              <span className="text-[11px] font-mono text-stone-500">
                {values.length} of {options.length} selected
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-[#18181B] text-white hover:bg-[#AD8143] text-xs font-medium rounded transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categorySlugs: string[]) => void;
  selectedFinishes: string[];
  onFinishesChange: (finishIds: string[]) => void;
  selectedSeries: string[];
  onSeriesChange: (seriesNames: string[]) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  totalCount?: number;
  filteredCount?: number;
  onResetAll?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedFinishes,
  onFinishesChange,
  selectedSeries,
  onSeriesChange,
  sortBy = 'featured',
  onSortChange,
  totalCount = 17,
  filteredCount,
  onResetAll,
}) => {
  const categoryOptions = useMemo<Select2Option[]>(() => [
    ...CATEGORIES.map((category) => ({
      value: category.slug,
      label: category.title,
      count: DEMO_PRODUCTS.filter((product) => product.categorySlug === category.slug).length,
    })),
  ], []);

  const finishOptions = useMemo<Select2Option[]>(() => [
    ...FINISHES.map((finish) => ({
      value: finish.id,
      label: finish.name,
      colorHex: finish.hex,
      count: DEMO_PRODUCTS.filter((product) => product.finishes.some((item) => item.id === finish.id)).length,
    })).filter((finish) => (finish.count ?? 0) > 0),
  ], []);

  const seriesOptions = useMemo<Select2Option[]>(() => [
    ...Array.from(new Set(DEMO_PRODUCTS.map((product) => product.series)))
      .sort()
      .map((series) => ({
        value: series,
        label: series,
        count: DEMO_PRODUCTS.filter((product) => product.series === series).length,
      })),
  ], []);

  const sortOptions = useMemo<Select2Option[]>(() => [
    { value: 'featured', label: 'Featured' },
    { value: 'name-asc', label: 'Name: A–Z' },
    { value: 'name-desc', label: 'Name: Z–A' },
    { value: 'series', label: 'Series' },
  ], []);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const activeFiltersCount =
    selectedCategories.length +
    selectedFinishes.length +
    selectedSeries.length +
    (searchQuery ? 1 : 0);

  return (
    <div className="w-full mb-8" style={{ fontFamily: '"Poppins", sans-serif' }}>
      {/* Outer Filter Box Container */}
      <div className="bg-[#F8F7F3] border border-[#E7E5DF] rounded-2xl p-3 sm:p-3.5 shadow-xs mb-4">
        {/* Responsive Container: Single row on desktop, collapsible stacked card on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3">
          {/* Top Bar: Filter Toggle Button & Search Input Box */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 w-full">
            {/* Filters Button (Interactive Open/Close on Mobile) */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
              aria-expanded={isMobileFiltersOpen}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-semibold transition-all shadow-2xs shrink-0 h-10 cursor-pointer ${
                isMobileFiltersOpen || activeFiltersCount > 0
                  ? 'bg-[#FAF6EE] border-[#AD8143] text-[#946B00]'
                  : 'bg-white border-[#E2DFD7] text-[#18181B] hover:bg-stone-50'
              }`}
            >
              <SlidersHorizontal size={14} weight="bold" />
              <span>Filters</span>
              <span
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                  activeFiltersCount > 0 ? 'bg-[#AD8143] text-white' : 'bg-[#18181B] text-white'
                }`}
              >
                {activeFiltersCount}
              </span>
              <CaretDown
                size={12}
                weight="bold"
                className={`transition-transform duration-200 lg:hidden ${
                  isMobileFiltersOpen ? 'rotate-180 text-[#946B00]' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Search Input Box - strictly bounded so it NEVER overflows on mobile */}
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
                <MagnifyingGlass size={15} />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 bg-white border border-[#E2DFD7] rounded-lg pl-9 pr-8 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={12} weight="bold" />
                </button>
              )}
            </div>
          </div>

          {/* Group 2: Select2 Feature Dropdowns
              On Mobile: Collapsible (open/close) when user taps Filters button. Full width, no broken words!
              On Desktop (lg): Always visible side-by-side in a sleek single row! */}
          <div
            className={`${
              isMobileFiltersOpen ? 'flex' : 'hidden'
            } lg:flex flex-col sm:grid sm:grid-cols-2 lg:flex-row lg:items-center gap-2.5 sm:gap-3 pt-2.5 lg:pt-0 border-t border-[#EAE6DE] lg:border-t-0 shrink-0 w-full lg:w-auto`}
          >
            {/* 1. Category Select2 Dropdown (Multi-select) */}
            <Select2Dropdown
              values={selectedCategories}
              onChange={onCategoriesChange}
              options={categoryOptions}
              placeholder="All categories"
              searchPlaceholder="Search categories..."
              multiple={true}
              searchable={true}
              className="w-full lg:w-[175px] xl:w-[200px]"
            />

            {/* 2. Finish Select2 Dropdown (Multi-select with Swatches) */}
            <Select2Dropdown
              values={selectedFinishes}
              onChange={onFinishesChange}
              options={finishOptions}
              placeholder="All finishes"
              searchPlaceholder="Search finishes..."
              multiple={true}
              searchable={true}
              className="w-full lg:w-[155px] xl:w-[175px]"
            />

            {/* 3. Series Select2 Dropdown (Multi-select) */}
            <Select2Dropdown
              values={selectedSeries}
              onChange={onSeriesChange}
              options={seriesOptions}
              placeholder="All series"
              searchPlaceholder="Search series..."
              multiple={true}
              searchable={true}
              className="w-full lg:w-[145px] xl:w-[160px]"
            />

            {/* 4. Sort By Dropdown (Single-select) */}
            {onSortChange && (
              <Select2Dropdown
                values={sortBy ? [sortBy] : []}
                onChange={(vals) => onSortChange(vals[0] || 'featured')}
                options={sortOptions}
                placeholder="Sort: Featured"
                searchPlaceholder="Search sort..."
                multiple={false}
                searchable={false}
                className="w-full lg:w-[140px] xl:w-[150px]"
              />
            )}

            {/* Mobile-only Reset All Action when filters are open */}
            {activeFiltersCount > 0 && onResetAll && (
              <div className="flex items-center justify-between pt-1 px-1 sm:col-span-2 lg:hidden">
                <span className="text-[11px] font-mono text-stone-500">
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} applied
                </span>
                <button
                  type="button"
                  onClick={onResetAll}
                  className="text-[11px] font-semibold text-[#946B00] hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Under Filter Box: Product Count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-stone-500 font-sans">
          {filteredCount ?? totalCount} products
        </span>
      </div>
    </div>
  );
};

export default ProductFilters;
