import { useTheme, ThemeName } from "@/themes/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="theme-select" className="text-sm font-medium">
        Resume Theme:
      </label>
      <Select value={currentTheme} onValueChange={(value) => setTheme(value as ThemeName)}>
        <SelectTrigger id="theme-select" className="w-32">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="simple">Simple</SelectItem>
          <SelectItem value="centered">Centered</SelectItem>
          <SelectItem value="sidebar">Sidebar</SelectItem>
          <SelectItem value="modern">Modern</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}