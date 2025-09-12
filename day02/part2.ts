import { processedData } from './data';
import { isReportSafe } from './part1';

/**
 * Create all variations of the report by removing numbers from each index.
 * For example, if the report is [1, 2, 3, 4, 5], this function returns:
 * [
 *  [2, 3, 4, 5], // Removed index 0
 *  [1, 3, 4, 5], // Removed index 1
 *  [1, 2, 4, 5], // Removed index 2
 *  [1, 2, 3, 5], // Removed index 3
 *  [1, 2, 3, 4]  // Removed index 4
 * ]
 */
function createReportVariations(report: number[]): number[][] {
  return report.map((levels, index) => report.toSpliced(index, 1));
}

/**
 * Call the report safety evaluation on all report variations to determine
 * whether the report would be safe after removing one numbers.
 */
function retryAllReportVariations(report: number[]) {
  const reportVariations = createReportVariations(report);
  return reportVariations.reduce(
    (isSafe, reportVariant) => isSafe || isReportSafe(reportVariant),
    false
  );
}

function isReportSafeV2(report: number[], shouldRetry?: boolean): boolean {
  // Determine whether the level is increasing or decreasing
  const trend = Math.sign(report[0] - report[1]);

  // The report is not safe if the level is neither increasing or decreasing
  if (trend === 0) {
    if (shouldRetry) {
      return retryAllReportVariations(report);
    }
    return false;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const levelChange = report[i] - report[i + 1];

    // If the trend has changed, the report is not safe
    if (Math.sign(levelChange) !== trend) {
      if (shouldRetry) {
        return retryAllReportVariations(report);
      }
      return false;
    }

    // The level change is too large, so the report is not safe
    if (Math.abs(levelChange) > 3) {
      if (shouldRetry) {
        if (shouldRetry) {
          return retryAllReportVariations(report);
        }
      }
      return false;
    }
  }

  return true;
}

const numSafeReports = processedData.reduce((sum, report) => {
  if (isReportSafeV2(report, true)) {
    return sum + 1;
  }
  return sum;
}, 0);

console.log(numSafeReports);
