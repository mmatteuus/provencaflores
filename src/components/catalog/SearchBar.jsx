import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Função de similaridade simples (Levenshtein distance simplificada)
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;
  
  let matches = 0;
  const minLen = Math.min(s1.length, s2.length);
  
  for (let i = 0; i < minLen; i++) {
    if (s1[i] === s2[i]) matches++;
  }
  
  return matches / Math.max(s1.length, s2.length);
}

// Função de busca fuzzy
function fuzzySearch(query, products) {
  if (!query || query.length < 2) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 1);
  
  const scored = products.map(product => {
    let score = 0;
    const productText = [
      product.name,
      product.description,
      product.category_name,
      ...(product.search_keywords || []),
      ...(product.colors || []),
      ...(product.materials || [])
    ].join(' ').toLowerCase();
    
    searchTerms.forEach(term => {
      // Busca exata
      if (productText.includes(term)) {
        score += 10;
      }
      
      // Busca por palavras individuais
      const words = productText.split(/\s+/);
      words.forEach(word => {
        const similarity = calculateSimilarity(term, word);
        if (similarity > 0.7) {
          score += similarity * 5;
        }
      });
    });
    
    return { product, score };
  });
  
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
}

export default function SearchBar({ products, onSearch, searchTerm, setSearchTerm }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = fuzzySearch(searchTerm, products).slice(0, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleClear = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    onSearch('');
  };
  
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    setShowSuggestions(false);
    onSearch(product.name);
  };
  
  return (
    <div ref={searchRef} className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Buscar produtos, cores, tipos de flores..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-xl border-purple-200">
          <CardContent className="p-2">
            <div className="space-y-1">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`${createPageUrl("ProductDetail")}?slug=${product.slug}`}
                  onClick={() => handleSuggestionClick(product)}
                  className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        🌸
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-purple-600">
                      R$ {product.base_price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}