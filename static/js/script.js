// Stock Portfolio Analyzer JavaScript

let analyzedStocks = [];
let selectedStocks = [];

// DOM elements
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingAnalysis = document.getElementById('loadingAnalysis');
const analysisResults = document.getElementById('analysisResults');
const stocksTableBody = document.getElementById('stocksTableBody');
const portfolioSection = document.getElementById('portfolioSection');
const portfolioAmount = document.getElementById('portfolioAmount');
const createPortfolioBtn = document.getElementById('createPortfolioBtn');
const portfolioResults = document.getElementById('portfolioResults');
const portfolioTableBody = document.getElementById('portfolioTableBody');
const projectionSection = document.getElementById('projectionSection');
const projectionStock = document.getElementById('projectionStock');
const projectionMonths = document.getElementById('projectionMonths');
const calculateProjectionBtn = document.getElementById('calculateProjectionBtn');
const projectionResults = document.getElementById('projectionResults');

// Event listeners
analyzeBtn.addEventListener('click', startAnalysis);
createPortfolioBtn.addEventListener('click', createPortfolio);
calculateProjectionBtn.addEventListener('click', calculateProjection);

// Start stock analysis
async function startAnalysis() {
    try {
        // Show loading state
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
        loadingAnalysis.classList.remove('d-none');
        
        // Make API call
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            analyzedStocks = data.stocks;
            displayAnalysisResults(analyzedStocks);
            showSuccessMessage('Stock analysis completed successfully!');
        } else {
            showErrorMessage('Error analyzing stocks: ' + data.error);
        }
    } catch (error) {
        showErrorMessage('Network error: ' + error.message);
    } finally {
        // Reset button state
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-play me-2"></i>Start Analysis';
        loadingAnalysis.classList.add('d-none');
    }
}

// Display analysis results
function displayAnalysisResults(stocks) {
    stocksTableBody.innerHTML = '';
    
    stocks.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${stock.symbol}</strong></td>
            <td>${stock.company_name || 'N/A'}</td>
            <td>${formatNumber(stock.pe_ratio)}</td>
            <td>${formatNumber(stock.sharpe_ratio)}</td>
            <td>${formatNumber(stock.dividend_yield)}%</td>
            <td><strong>${formatNumber(stock.avg_ratio)}</strong></td>
            <td>$${formatNumber(stock.current_price)}</td>
            <td>
                <div class="form-check">
                    <input class="form-check-input stock-checkbox" type="checkbox" 
                           value="${stock.symbol}" data-stock='${JSON.stringify(stock)}'>
                </div>
            </td>
        `;
        stocksTableBody.appendChild(row);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.stock-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleStockSelection);
    });
    
    // Show results
    analysisResults.classList.remove('d-none');
    analysisResults.classList.add('fade-in');
    portfolioSection.classList.remove('d-none');
    portfolioSection.classList.add('fade-in');
}

// Handle stock selection
function handleStockSelection(event) {
    const stockData = JSON.parse(event.target.dataset.stock);
    
    if (event.target.checked) {
        selectedStocks.push(stockData);
    } else {
        selectedStocks = selectedStocks.filter(stock => stock.symbol !== stockData.symbol);
    }
    
    // Update projection stock dropdown
    updateProjectionStockDropdown();
}

// Update projection stock dropdown
function updateProjectionStockDropdown() {
    projectionStock.innerHTML = '<option value="">Choose a stock...</option>';
    
    selectedStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.symbol;
        option.textContent = `${stock.symbol} - ${stock.company_name || 'N/A'}`;
        projectionStock.appendChild(option);
    });
}

// Create portfolio
async function createPortfolio() {
    try {
        const amount = parseFloat(portfolioAmount.value);
        
        if (!amount || amount <= 0) {
            showErrorMessage('Please enter a valid portfolio amount.');
            return;
        }
        
        if (selectedStocks.length === 0) {
            showErrorMessage('Please select at least one stock for your portfolio.');
            return;
        }
        
        // Show loading state
        createPortfolioBtn.disabled = true;
        createPortfolioBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating Portfolio...';
        
        // Make API call
        const response = await fetch('/create_portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selected_stocks: selectedStocks,
                portfolio_amount: amount
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayPortfolioResults(data);
            showSuccessMessage('Portfolio created successfully!');
            projectionSection.classList.remove('d-none');
            projectionSection.classList.add('fade-in');
        } else {
            showErrorMessage('Error creating portfolio: ' + data.error);
        }
    } catch (error) {
        showErrorMessage('Network error: ' + error.message);
    } finally {
        // Reset button state
        createPortfolioBtn.disabled = false;
        createPortfolioBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Create Portfolio';
    }
}

// Display portfolio results
function displayPortfolioResults(data) {
    portfolioTableBody.innerHTML = '';
    
    data.portfolio.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${stock.symbol}</strong><br><small>${stock.company_name}</small></td>
            <td>${stock.shares}</td>
            <td>$${formatNumber(stock.allocation)}</td>
            <td>${formatNumber(stock.percentage)}%</td>
        `;
        portfolioTableBody.appendChild(row);
    });
    
    // Update summary
    document.getElementById('totalAllocation').textContent = formatNumber(data.total_allocation);
    document.getElementById('diversificationScore').textContent = formatNumber(data.diversification_score * 100);
    document.getElementById('diversificationBar').style.width = (data.diversification_score * 100) + '%';
    
    // Show results
    portfolioResults.classList.remove('d-none');
    portfolioResults.classList.add('fade-in');
}

// Calculate growth projection
async function calculateProjection() {
    try {
        const symbol = projectionStock.value;
        const months = parseInt(projectionMonths.value);
        
        if (!symbol) {
            showErrorMessage('Please select a stock for projection.');
            return;
        }
        
        if (!months || months < 1 || months > 60) {
            showErrorMessage('Please enter a valid number of months (1-60).');
            return;
        }
        
        // Show loading state
        calculateProjectionBtn.disabled = true;
        calculateProjectionBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Calculating...';
        
        // Make API call
        const response = await fetch('/growth_projection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol: symbol,
                months: months
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayProjectionResults(data.projection);
            showSuccessMessage('Growth projection calculated successfully!');
        } else {
            showErrorMessage('Error calculating projection: ' + data.error);
        }
    } catch (error) {
        showErrorMessage('Network error: ' + error.message);
    } finally {
        // Reset button state
        calculateProjectionBtn.disabled = false;
        calculateProjectionBtn.innerHTML = '<i class="fas fa-calculator me-2"></i>Calculate Projection';
    }
}

// Display projection results
function displayProjectionResults(projection) {
    document.getElementById('currentPrice').textContent = formatNumber(projection.current_price);
    document.getElementById('projectedPrice').textContent = formatNumber(projection.projected_price);
    document.getElementById('totalGrowth').textContent = formatNumber(projection.growth_percentage);
    document.getElementById('monthlyGrowth').textContent = formatNumber(projection.monthly_growth);
    
    // Show results
    projectionResults.classList.remove('d-none');
    projectionResults.classList.add('fade-in');
}

// Utility functions
function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) {
        return 'N/A';
    }
    return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'danger');
}

function showMessage(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 