// src/components/FlashcardSummary.tsx
interface FlashcardSummaryData {
  optimalApproach: string;
  optimalTime: string;
  optimalSpace: string;
}

interface FlashcardSummaryProps {
  data: FlashcardSummaryData;
}

export const FlashcardSummary: React.FC<FlashcardSummaryProps> = ({ data }) => (
  <div className="glass p-4 rounded-lg border border-primary/30">
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
      🗂️ Quick Summary
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-300">Optimal Approach</p>
        <p className="font-mono">{data.optimalApproach}</p>
      </div>
      <div>
        <p className="text-sm text-gray-300">Time Complexity</p>
        <p className="font-mono">{data.optimalTime}</p>
      </div>
    </div>
  </div>
);