import type { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  country: string;
  setCountry: (country: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export const SearchForm: FC<SearchFormProps> = ({
  country,
  setCountry,
  onSearch,
  loading,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return(
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <Input
          type="text"
          placeholder="Enter City name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="flex-1 h-12 sm:h-10 text-base sm:text-sm"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading || !country.trim()}
          className="h-12 sm:h-10 px-6 sm:px-4 text-base sm:text-sm font-medium bg-slate-800 text-slate-50 dark:bg-slate-200 dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">Loading</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}