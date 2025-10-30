import { ArrowUpDown, TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const assets = [
  {
    ticker: "DANGCEM",
    name: "Dangote Cement",
    type: "Stock",
    country: "🇳🇬 Nigeria",
    value: "$24,500",
    change24h: 2.4,
    change7d: 8.3,
  },
  {
    ticker: "SOLAR-KE",
    name: "Kenya Solar Project",
    type: "RWA",
    country: "🇰🇪 Kenya",
    value: "$15,000",
    change24h: 0.5,
    change7d: 3.2,
  },
  {
    ticker: "NPN",
    name: "Naspers",
    type: "Stock",
    country: "🇿🇦 South Africa",
    value: "$32,100",
    change24h: -1.2,
    change7d: 5.1,
  },
  {
    ticker: "AGRI-GH",
    name: "Ghana Farmland Token",
    type: "RWA",
    country: "🇬🇭 Ghana",
    value: "$18,750",
    change24h: 1.8,
    change7d: 4.6,
  },
  {
    ticker: "COMI",
    name: "Commercial Intl Bank",
    type: "Stock",
    country: "🇪🇬 Egypt",
    value: "$12,300",
    change24h: 3.1,
    change7d: 7.2,
  },
];

export function AssetTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" size="sm" className="h-8 -ml-3">
                Asset
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">24h</TableHead>
            <TableHead className="text-right">7d</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.ticker} data-testid={`asset-row-${asset.ticker}`}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-mono font-semibold">{asset.ticker}</div>
                  <div className="text-xs text-muted-foreground">{asset.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {asset.type}
                </Badge>
              </TableCell>
              <TableCell>{asset.country}</TableCell>
              <TableCell className="text-right font-mono font-semibold">
                {asset.value}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  {asset.change24h > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-500" />
                  )}
                  <span
                    className={`font-mono text-sm ${
                      asset.change24h > 0
                        ? "text-green-600 dark:text-green-500"
                        : "text-red-600 dark:text-red-500"
                    }`}
                  >
                    {asset.change24h > 0 ? "+" : ""}
                    {asset.change24h}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  {asset.change7d > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-500" />
                  )}
                  <span
                    className={`font-mono text-sm ${
                      asset.change7d > 0
                        ? "text-green-600 dark:text-green-500"
                        : "text-red-600 dark:text-red-500"
                    }`}
                  >
                    {asset.change7d > 0 ? "+" : ""}
                    {asset.change7d}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid={`button-actions-${asset.ticker}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
