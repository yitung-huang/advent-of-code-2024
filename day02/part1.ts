import { processedData } from './data';

function isReportSafe(report: number[]) {
  // Determine whether the level is increasing or decreasing
  const trend = Math.sign(report[0] - report[1]);

  // The report is not safe if the level is neither increasing or decreasing
  if (trend === 0) {
    return false;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const levelChange = report[i] - report[i + 1];

    // If the trend has changed, the report is not safe
    if (Math.sign(levelChange) !== trend) {
      return false;
    }

    // The level change is too large, so the report is not safe
    if (Math.abs(levelChange) > 3) {
      return false;
    }
  }

  return true;
}

const numSafeReports = processedData.reduce((sum, report) => {
  if (isReportSafe(report)) {
    return sum + 1;
  }
  return sum;
}, 0);

console.log(numSafeReports);
