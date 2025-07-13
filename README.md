# Stock Portfolio Analyzer

A comprehensive web application for analyzing S&P 500 stocks and creating diversified portfolios with growth projections.

## Features

### 📊 Stock Analysis
- Analyzes S&P 500 stocks using three key financial ratios:
  - **P/E Ratio**: Price-to-Earnings ratio for valuation
  - **Sharpe Ratio**: Risk-adjusted return measure
  - **Dividend Yield**: Annual dividend as percentage of stock price
- Ranks stocks by average of these ratios
- Displays top 10 performing stocks

### 💼 Portfolio Creation
- Allows users to specify portfolio amount
- Creates diversified portfolios with equal weight allocation
- Provides diversification score and allocation breakdown
- Justifies diversification strategy

### 📈 Growth Projections
- Uses linear regression on 2-year historical data
- Projects stock prices for user-specified time periods
- Calculates monthly and total growth percentages
- Provides current vs projected price comparisons

## Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Google OAuth 2.0 with Flask-Login
- **Data Source**: Yahoo Finance API (via yfinance)
- **Styling**: Bootstrap 5 + Custom CSS
- **Charts**: Plotly (for future enhancements)
- **Machine Learning**: scikit-learn for projections

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stocks-Analyzer
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Google OAuth** (See [OAUTH_SETUP.md](OAUTH_SETUP.md) for detailed instructions)
   - Create Google Cloud Console project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Configure environment variables

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5001`

## Usage

### Authentication
1. Visit the application at `http://localhost:5001`
2. Click "Sign in with Google" to authenticate
3. Grant permissions to access your Google account information
4. You'll be redirected to the dashboard after successful authentication

### Step 1: Stock Analysis
1. Click "Start Analysis" to begin analyzing S&P 500 stocks
2. Wait for the analysis to complete (may take a few minutes)
3. Review the top 10 stocks ranked by average ratio performance
4. Select stocks for your portfolio using the checkboxes

### Step 2: Portfolio Creation
1. Enter your desired portfolio amount
2. Click "Create Portfolio" to generate allocation
3. Review the diversification strategy and allocation breakdown
4. Check the diversification score for portfolio quality

### Step 3: Growth Projections
1. Select a stock from your portfolio
2. Enter the number of months for projection (1-60)
3. Click "Calculate Projection" to see growth estimates
4. Review current vs projected prices and growth percentages

## Key Metrics Explained

### P/E Ratio
- **What it is**: Price per share divided by earnings per share
- **Interpretation**: Lower ratios may indicate undervalued stocks
- **Formula**: Market Price / Earnings Per Share

### Sharpe Ratio
- **What it is**: Risk-adjusted return measure
- **Interpretation**: Higher ratios indicate better risk-adjusted returns
- **Formula**: (Return - Risk Free Rate) / Standard Deviation

### Dividend Yield
- **What it is**: Annual dividend as percentage of stock price
- **Interpretation**: Higher yields provide income but may indicate risk
- **Formula**: (Annual Dividend / Stock Price) × 100

## Diversification Strategy

The application uses an **equal weight allocation** strategy:

- **Equal Distribution**: Each selected stock receives equal portfolio allocation
- **Risk Reduction**: Spreading investments across multiple stocks reduces individual stock risk
- **Sector Balance**: Diversification across different sectors and industries
- **Rebalancing**: Equal weights help maintain portfolio balance over time

## Growth Projection Methodology

1. **Data Collection**: Gathers 2 years of historical price data
2. **Linear Regression**: Fits a linear model to price trends
3. **Projection**: Extends the trend line for user-specified months
4. **Calculation**: Computes growth percentages and monthly rates

**Note**: Projections are based on historical trends and should not be considered as financial advice.

## File Structure

```
Stocks-Analyzer/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Custom CSS styles
    └── js/
        └── script.js     # Frontend JavaScript
```

## API Endpoints

- `GET /`: Main application page
- `POST /analyze`: Analyze S&P 500 stocks
- `POST /create_portfolio`: Create diversified portfolio
- `POST /growth_projection`: Calculate growth projections

## Error Handling

The application includes comprehensive error handling for:
- Network connectivity issues
- Invalid user inputs
- API rate limiting
- Data availability problems

## Future Enhancements

- [ ] Real-time stock price updates
- [ ] Advanced portfolio optimization algorithms
- [ ] Sector-based analysis
- [ ] Risk assessment tools
- [ ] Export functionality for portfolio data
- [ ] Interactive charts and visualizations
- [ ] User account management
- [ ] Historical portfolio performance tracking

## Disclaimer

This application is for educational and informational purposes only. Stock market investments carry inherent risks, and past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 