import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

const COLOR_OPTIONS = [
  { value: "vermelho", label: "Vermelho", color: "bg-red-500" },
  { value: "rosa", label: "Rosa", color: "bg-pink-400" },
  { value: "branco", label: "Branco", color: "bg-white border border-gray-300" },
  { value: "amarelo", label: "Amarelo", color: "bg-yellow-400" },
  { value: "laranja", label: "Laranja", color: "bg-orange-500" },
  { value: "roxo", label: "Roxo", color: "bg-purple-500" },
  { value: "azul", label: "Azul", color: "bg-blue-500" },
  { value: "verde", label: "Verde", color: "bg-green-500" },
  { value: "misto", label: "Misto", color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  { value: "multicolor", label: "Multicolor", color: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" }
];

const MATERIAL_OPTIONS = [
  { value: "rosas", label: "Rosas", icon: "🌹" },
  { value: "girassol", label: "Girassol", icon: "🌻" },
  { value: "orquideas", label: "Orquídeas", icon: "🌸" },
  { value: "lirios", label: "Lírios", icon: "🌺" },
  { value: "tulipas", label: "Tulipas", icon: "🌷" },
  { value: "margaridas", label: "Margaridas", icon: "🌼" },
  { value: "crisantemos", label: "Crisântemos", icon: "💐" },
  { value: "begonias", label: "Begônias", icon: "🌺" },
  { value: "cactos", label: "Cactos", icon: "🌵" },
  { value: "suculentas", label: "Suculentas", icon: "🪴" },
  { value: "flores_mistas", label: "Flores Mistas", icon: "💐" },
  { value: "folhagens", label: "Folhagens", icon: "🌿" }
];

export default function FilterPanel({
  categories,
  categoryFilter,
  setCategoryFilter,
  colorFilters,
  setColorFilters,
  materialFilters,
  setMaterialFilters,
  sortBy,
  setSortBy,
  onClearFilters
}) {
  const toggleColorFilter = (color) => {
    setColorFilters(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const toggleMaterialFilter = (material) => {
    setMaterialFilters(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  const hasActiveFilters = categoryFilter !== "all" || colorFilters.length > 0 || materialFilters.length > 0;
  
  return (
    <div className="space-y-6">
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex flex-wrap gap-2">
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Categoria ativa
              </Badge>
            )}
            {colorFilters.map(color => (
              <Badge key={color} variant="secondary" className="bg-purple-100 text-purple-700 flex items-center gap-1">
                {COLOR_OPTIONS.find(c => c.value === color)?.label}
                <button onClick={() => toggleColorFilter(color)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {materialFilters.map(material => (
              <Badge key={material} variant="secondary" className="bg-purple-100 text-purple-700 flex items-center gap-1">
                {MATERIAL_OPTIONS.find(m => m.value === material)?.label}
                <button onClick={() => toggleMaterialFilter(material)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-purple-600">
            Limpar tudo
          </Button>
        </div>
      )}
      
      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Categoria</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Color Filters */}
      <div>
        <label className="text-sm font-medium mb-3 block">Cores</label>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleColorFilter(color.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                colorFilters.includes(color.value)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className={`w-5 h-5 rounded-full ${color.color}`}></div>
              <span className="text-sm font-medium">{color.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Material Filters */}
      <div>
        <label className="text-sm font-medium mb-3 block">Tipos de Flores</label>
        <div className="grid grid-cols-2 gap-2">
          {MATERIAL_OPTIONS.map((material) => (
            <button
              key={material.value}
              onClick={() => toggleMaterialFilter(material.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                materialFilters.includes(material.value)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <span className="text-xl">{material.icon}</span>
              <span className="text-sm font-medium">{material.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Sort Options */}
      <div>
        <label className="text-sm font-medium mb-2 block">Ordenar por</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevância</SelectItem>
            <SelectItem value="name">Nome (A-Z)</SelectItem>
            <SelectItem value="price_asc">Menor preço</SelectItem>
            <SelectItem value="price_desc">Maior preço</SelectItem>
            <SelectItem value="newest">Mais recentes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}