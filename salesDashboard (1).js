/* ===== Salesforce Sales Dashboard - Main JS ===== */

// ========================
// Salesforce Mock Data Store
// ========================
const SFStore = {
  connected: false,
  lastSync: null,
  config: { instanceUrl: '', clientId: '', clientSecret: '' },

  // Salesforce連携用: 商談(Opportunity)データ
  opportunities: [
    { id: 'OPP-001', name: '株式会社ABC - ERPシステム導入', account: '株式会社ABC', owner: '田中太郎', amount: 4800000, stage: 'closed-won', probability: 100, closeDate: '2026-01-15', created: '2025-10-01', type: '新規', product: 'ERP' },
    { id: 'OPP-002', name: 'DEF工業 - クラウド移行', account: 'DEF工業株式会社', owner: '鈴木花子', amount: 3200000, stage: 'negotiation', probability: 75, closeDate: '2026-03-20', created: '2025-12-10', type: '新規', product: 'クラウド' },
    { id: 'OPP-003', name: 'GHI商事 - CRM導入', account: 'GHI商事', owner: '佐藤一郎', amount: 2500000, stage: 'proposal', probability: 50, closeDate: '2026-04-10', created: '2026-01-05', type: '新規', product: 'CRM' },
    { id: 'OPP-004', name: 'JKL株式会社 - セキュリティ対策', account: 'JKL株式会社', owner: '田中太郎', amount: 1800000, stage: 'qualification', probability: 25, closeDate: '2026-05-15', created: '2026-01-20', type: '新規', product: 'セキュリティ' },
    { id: 'OPP-005', name: 'MNO出版 - Webサイトリニューアル', account: 'MNO出版', owner: '高橋美咲', amount: 5600000, stage: 'closed-won', closeDate: '2026-02-01', created: '2025-09-15', probability: 100, type: '新規', product: 'Web' },
    { id: 'OPP-006', name: 'PQR建設 - IoTプラットフォーム', account: 'PQR建設株式会社', owner: '鈴木花子', amount: 7200000, stage: 'proposal', probability: 50, closeDate: '2026-04-30', created: '2025-11-20', type: '新規', product: 'IoT' },
    { id: 'OPP-007', name: 'STU製薬 - データ分析基盤', account: 'STU製薬株式会社', owner: '佐藤一郎', amount: 9800000, stage: 'negotiation', probability: 70, closeDate: '2026-03-31', created: '2025-11-01', type: '新規', product: 'データ分析' },
    { id: 'OPP-008', name: 'VWXテック - AI導入支援', account: 'VWXテック', owner: '田中太郎', amount: 6400000, stage: 'prospect', probability: 10, closeDate: '2026-06-30', created: '2026-02-01', type: '新規', product: 'AI' },
    { id: 'OPP-009', name: 'ABC商事 - 保守契約更新', account: '株式会社ABC', owner: '田中太郎', amount: 1200000, stage: 'closed-won', probability: 100, closeDate: '2026-01-31', created: '2025-12-15', type: '既存', product: 'ERP' },
    { id: 'OPP-010', name: 'YZ物流 - 倉庫管理システム', account: 'YZ物流株式会社', owner: '高橋美咲', amount: 4200000, stage: 'qualification', probability: 30, closeDate: '2026-05-20', created: '2026-01-15', type: '新規', product: 'WMS' },
    { id: 'OPP-011', name: 'DEF工業 - 追加ライセンス', account: 'DEF工業株式会社', owner: '鈴木花子', amount: 800000, stage: 'closed-won', probability: 100, closeDate: '2026-02-15', created: '2026-01-10', type: '既存', product: 'クラウド' },
    { id: 'OPP-012', name: 'KLM電機 - 生産管理システム', account: 'KLM電機', owner: '佐藤一郎', amount: 11200000, stage: 'prospect', probability: 15, closeDate: '2026-07-31', created: '2026-02-10', type: '新規', product: 'MES' },
    { id: 'OPP-013', name: 'NOP食品 - EC基盤構築', account: 'NOP食品株式会社', owner: '高橋美咲', amount: 3600000, stage: 'closed-lost', probability: 0, closeDate: '2026-02-20', created: '2025-10-20', type: '新規', product: 'EC' },
    { id: 'OPP-014', name: 'QRS銀行 - セキュリティ監査', account: 'QRS銀行', owner: '田中太郎', amount: 2800000, stage: 'proposal', probability: 45, closeDate: '2026-04-15', created: '2026-01-25', type: '新規', product: 'セキュリティ' },
    { id: 'OPP-015', name: 'TUV旅行 - 予約システム刷新', account: 'TUV旅行株式会社', owner: '鈴木花子', amount: 5000000, stage: 'closed-lost', probability: 0, closeDate: '2026-01-28', created: '2025-08-10', type: '新規', product: 'Web' },
  ],

  // 月別売上データ（Salesforceレポートから取得想定）
  monthlyRevenue: [
    { month: '2025-04', revenue: 8200000, target: 10000000 },
    { month: '2025-05', revenue: 9500000, target: 10000000 },
    { month: '2025-06', revenue: 11200000, target: 10000000 },
    { month: '2025-07', revenue: 7800000, target: 10000000 },
    { month: '2025-08', revenue: 10800000, target: 12000000 },
    { month: '2025-09', revenue: 13500000, target: 12000000 },
    { month: '2025-10', revenue: 9200000, target: 12000000 },
    { month: '2025-11', revenue: 14200000, target: 12000000 },
    { month: '2025-12', revenue: 16800000, target: 15000000 },
    { month: '2026-01', revenue: 12400000, target: 15000000 },
    { month: '2026-02', revenue: 11000000, target: 15000000 },
    { month: '2026-03', revenue: 0, target: 15000000 },
  ],

  // 営業担当者データ
  reps: [
    { id: 'REP-001', name: '田中太郎', initials: '田中', team: '第一営業部', quota: 25000000, color: '#0176d3' },
    { id: 'REP-002', name: '鈴木花子', initials: '鈴木', team: '第一営業部', quota: 22000000, color: '#7526c6' },
    { id: 'REP-003', name: '佐藤一郎', initials: '佐藤', team: '第二営業部', quota: 20000000, color: '#2e844a' },
    { id: 'REP-004', name: '高橋美咲', initials: '高橋', team: '第二営業部', quota: 23000000, color: '#fe9339' },
  ],

  // 活動ログ（Salesforceタスク・イベントから取得想定）
  activities: [
    { id: 'ACT-001', type: 'deal', rep: '田中太郎', text: '株式会社ABC - ERPシステム導入を<strong>受注</strong>しました', time: '2時間前', amount: 4800000 },
    { id: 'ACT-002', type: 'meeting', rep: '鈴木花子', text: 'DEF工業 クラウド移行の<strong>契約交渉MTG</strong>を実施', time: '3時間前' },
    { id: 'ACT-003', type: 'call', rep: '佐藤一郎', text: 'GHI商事 CRM導入の<strong>提案フォロー電話</strong>を実施', time: '5時間前' },
    { id: 'ACT-004', type: 'email', rep: '高橋美咲', text: 'YZ物流へ<strong>見積書</strong>を送付', time: '本日 10:30' },
    { id: 'ACT-005', type: 'meeting', rep: '田中太郎', text: 'JKL株式会社 セキュリティ対策の<strong>ヒアリング</strong>を実施', time: '昨日 16:00' },
    { id: 'ACT-006', type: 'deal', rep: '高橋美咲', text: 'MNO出版 - Webサイトリニューアルを<strong>受注</strong>しました', time: '昨日 14:00', amount: 5600000 },
    { id: 'ACT-007', type: 'call', rep: '鈴木花子', text: 'PQR建設 IoTプラットフォームの<strong>進捗確認</strong>を実施', time: '昨日 11:00' },
    { id: 'ACT-008', type: 'email', rep: '佐藤一郎', text: 'STU製薬へ<strong>提案書</strong>を送付', time: '2日前' },
  ],

  // ===== 集計メソッド =====
  getStageLabel(stage) {
    const map = { 'prospect': 'リード', 'qualification': '評価', 'proposal': '提案', 'negotiation': '交渉', 'closed-won': '受注', 'closed-lost': '失注' };
    return map[stage] || stage;
  },

  getStageColor(stage) {
    const map = { 'prospect': '#7526c6', 'qualification': '#0176d3', 'proposal': '#fe9339', 'negotiation': '#c25400', 'closed-won': '#2e844a', 'closed-lost': '#ea001e' };
    return map[stage] || '#706e6b';
  },

  getPipelineStages() {
    const stages = ['prospect', 'qualification', 'proposal', 'negotiation'];
    return stages.map(stage => {
      const opps = this.opportunities.filter(o => o.stage === stage);
      return {
        stage,
        label: this.getStageLabel(stage),
        count: opps.length,
        amount: opps.reduce((sum, o) => sum + o.amount, 0),
        color: this.getStageColor(stage),
      };
    });
  },

  getTotalPipeline() {
    const active = this.opportunities.filter(o => !['closed-won', 'closed-lost'].includes(o.stage));
    return active.reduce((sum, o) => sum + o.amount, 0);
  },

  getWonAmount(period) {
    const won = this.opportunities.filter(o => o.stage === 'closed-won');
    if (period === 'month') {
      return won.filter(o => o.closeDate.startsWith('2026-02')).reduce((sum, o) => sum + o.amount, 0);
    }
    if (period === 'quarter') {
      return won.filter(o => {
        const m = o.closeDate.substring(0, 7);
        return m >= '2026-01' && m <= '2026-03';
      }).reduce((sum, o) => sum + o.amount, 0);
    }
    if (period === 'year') {
      return won.filter(o => o.closeDate.startsWith('2025-') || o.closeDate.startsWith('2026-')).reduce((sum, o) => sum + o.amount, 0);
    }
    return won.reduce((sum, o) => sum + o.amount, 0);
  },

  getWinRate() {
    const closed = this.opportunities.filter(o => ['closed-won', 'closed-lost'].includes(o.stage));
    if (closed.length === 0) return 0;
    const won = closed.filter(o => o.stage === 'closed-won').length;
    return Math.round((won / closed.length) * 100);
  },

  getAvgDealSize() {
    const won = this.opportunities.filter(o => o.stage === 'closed-won');
    if (won.length === 0) return 0;
    return Math.round(won.reduce((sum, o) => sum + o.amount, 0) / won.length);
  },

  getRepPerformance() {
    return this.reps.map(rep => {
      const repOpps = this.opportunities.filter(o => o.owner === rep.name);
      const won = repOpps.filter(o => o.stage === 'closed-won');
      const wonAmount = won.reduce((sum, o) => sum + o.amount, 0);
      const pipeline = repOpps.filter(o => !['closed-won', 'closed-lost'].includes(o.stage));
      const pipelineAmount = pipeline.reduce((sum, o) => sum + o.amount, 0);
      return {
        ...rep,
        wonAmount,
        pipelineAmount,
        deals: repOpps.length,
        wonDeals: won.length,
        attainment: Math.round((wonAmount / rep.quota) * 100),
      };
    });
  },

  getForecastData() {
    const committed = this.opportunities.filter(o => o.stage === 'negotiation' && o.probability >= 70).reduce((s, o) => s + o.amount, 0);
    const bestCase = this.opportunities.filter(o => ['proposal', 'negotiation'].includes(o.stage)).reduce((s, o) => s + o.amount, 0);
    const pipeline = this.getTotalPipeline();
    const won = this.getWonAmount('quarter');
    const target = 45000000;
    return { committed, bestCase, pipeline, won, target };
  },

  getProductBreakdown() {
    const products = {};
    this.opportunities.filter(o => o.stage === 'closed-won').forEach(o => {
      if (!products[o.product]) products[o.product] = 0;
      products[o.product] += o.amount;
    });
    return Object.entries(products).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);
  },

  getMonthlyTrend() {
    return this.monthlyRevenue;
  },
};


// ========================
// Utility Functions
// ========================
function formatYen(amount) {
  if (amount >= 100000000) return (amount / 100000000).toFixed(1) + '億';
  if (amount >= 10000) return (amount / 10000).toLocaleString() + '万';
  return '¥' + amount.toLocaleString();
}

function formatYenFull(amount) {
  return '¥' + amount.toLocaleString();
}

function formatPercent(val) {
  return val + '%';
}


// ========================
// App State & Router
// ========================
const AppState = {
  currentPage: 'dashboard',
  period: 'quarter',
  chartInstances: {},
};

function destroyCharts() {
  Object.values(AppState.chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  AppState.chartInstances = {};
}

function navigate(page) {
  AppState.currentPage = page;
  document.querySelectorAll('.sf-nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));

  const titles = {
    dashboard: 'セールスダッシュボード',
    pipeline: 'パイプライン管理',
    deals: '商談一覧',
    reps: '担当者パフォーマンス',
    forecast: 'フォーキャスト',
    activity: 'アクティビティ',
    dataimport: 'データ連携（CSV）',
  };
  document.getElementById('sfPageTitle').textContent = titles[page] || 'ダッシュボード';

  destroyCharts();
  renderPage(page);
}


// ========================
// Render Functions
// ========================
function renderPage(page) {
  const container = document.getElementById('sfPageContent');
  switch (page) {
    case 'dashboard': renderDashboard(container); break;
    case 'pipeline': renderPipeline(container); break;
    case 'deals': renderDeals(container); break;
    case 'reps': renderReps(container); break;
    case 'forecast': renderForecast(container); break;
    case 'activity': renderActivity(container); break;
    case 'dataimport': renderDataImport(container); break;
    default: renderDashboard(container);
  }
}

// ----- Dashboard -----
function renderDashboard(container) {
  const pipeline = SFStore.getTotalPipeline();
  const wonQ = SFStore.getWonAmount('quarter');
  const winRate = SFStore.getWinRate();
  const avgDeal = SFStore.getAvgDealSize();
  const forecast = SFStore.getForecastData();
  const targetQ = forecast.target;
  const attainment = targetQ > 0 ? Math.round((wonQ / targetQ) * 100) : 0;

  container.innerHTML = `
    <div class="sf-period-filter">
      <button class="sf-period-btn ${AppState.period === 'month' ? 'active' : ''}" data-period="month">今月</button>
      <button class="sf-period-btn ${AppState.period === 'quarter' ? 'active' : ''}" data-period="quarter">今四半期</button>
      <button class="sf-period-btn ${AppState.period === 'year' ? 'active' : ''}" data-period="year">今年度</button>
    </div>

    <div class="sf-kpi-grid">
      <div class="sf-kpi-card blue">
        <div class="sf-kpi-label">受注額（四半期）</div>
        <div class="sf-kpi-value">${formatYen(wonQ)}</div>
        <div class="sf-kpi-target">
          <div class="sf-kpi-target-label"><span>目標達成率</span><span>${attainment}%</span></div>
          <div class="sf-kpi-progress"><div class="sf-kpi-progress-bar blue" style="width:${Math.min(attainment, 100)}%"></div></div>
        </div>
      </div>
      <div class="sf-kpi-card green">
        <div class="sf-kpi-label">パイプライン総額</div>
        <div class="sf-kpi-value">${formatYen(pipeline)}</div>
        <div class="sf-kpi-sub neutral">${SFStore.opportunities.filter(o => !['closed-won','closed-lost'].includes(o.stage)).length}件の進行中商談</div>
      </div>
      <div class="sf-kpi-card orange">
        <div class="sf-kpi-label">受注率</div>
        <div class="sf-kpi-value">${winRate}%</div>
        <div class="sf-kpi-sub ${winRate >= 60 ? 'up' : winRate >= 40 ? 'neutral' : 'down'}">
          ${winRate >= 60 ? '&#9650;' : winRate >= 40 ? '&#9654;' : '&#9660;'} 業界平均: 45%
        </div>
      </div>
      <div class="sf-kpi-card purple">
        <div class="sf-kpi-label">平均商談額</div>
        <div class="sf-kpi-value">${formatYen(avgDeal)}</div>
        <div class="sf-kpi-sub up">&#9650; 前期比 +12%</div>
      </div>
    </div>

    <div class="sf-grid-2">
      <div class="sf-panel">
        <div class="sf-panel-header">
          <div class="sf-panel-title">月別売上推移</div>
        </div>
        <div class="sf-panel-body">
          <div class="sf-chart-container"><canvas id="chartRevenue"></canvas></div>
        </div>
      </div>
      <div class="sf-panel">
        <div class="sf-panel-header">
          <div class="sf-panel-title">パイプラインファネル</div>
        </div>
        <div class="sf-panel-body">
          ${renderFunnelHTML()}
        </div>
      </div>
    </div>

    <div class="sf-grid-2">
      <div class="sf-panel">
        <div class="sf-panel-header">
          <div class="sf-panel-title">担当者別受注額</div>
        </div>
        <div class="sf-panel-body">
          <div class="sf-chart-container"><canvas id="chartRepBar"></canvas></div>
        </div>
      </div>
      <div class="sf-panel">
        <div class="sf-panel-header">
          <div class="sf-panel-title">製品別受注</div>
        </div>
        <div class="sf-panel-body">
          <div class="sf-chart-container"><canvas id="chartProduct"></canvas></div>
        </div>
      </div>
    </div>

    <div class="sf-panel">
      <div class="sf-panel-header">
        <div class="sf-panel-title">最近のアクティビティ</div>
      </div>
      <div class="sf-panel-body">
        <div class="sf-activity-list">
          ${SFStore.activities.slice(0, 5).map(a => renderActivityItem(a)).join('')}
        </div>
      </div>
    </div>
  `;

  // Period filter
  container.querySelectorAll('.sf-period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.period = btn.dataset.period;
      destroyCharts();
      renderDashboard(container);
    });
  });

  drawRevenueChart();
  drawRepBarChart();
  drawProductChart();
}

function renderFunnelHTML() {
  const stages = SFStore.getPipelineStages();
  const maxAmount = Math.max(...stages.map(s => s.amount), 1);
  return `<div class="sf-funnel">${stages.map(s => {
    const pct = Math.max((s.amount / maxAmount) * 100, 15);
    return `
      <div class="sf-funnel-stage">
        <div class="sf-funnel-name">${s.label}</div>
        <div class="sf-funnel-bar-wrap">
          <div class="sf-funnel-bar" style="width:${pct}%;background:${s.color}">
            <span class="sf-funnel-bar-label">${formatYen(s.amount)}</span>
          </div>
        </div>
        <div class="sf-funnel-count">${s.count}件</div>
        <div class="sf-funnel-amount">${formatYenFull(s.amount)}</div>
      </div>`;
  }).join('')}</div>`;
}

function renderActivityItem(a) {
  const icons = { call: '&#128222;', email: '&#9993;', meeting: '&#128197;', deal: '&#127942;' };
  return `
    <div class="sf-activity-item">
      <div class="sf-activity-icon ${a.type}">${icons[a.type] || ''}</div>
      <div class="sf-activity-text"><strong>${a.rep}</strong> - ${a.text}</div>
      <div class="sf-activity-time">${a.time}</div>
    </div>`;
}

// ----- Pipeline Page -----
function renderPipeline(container) {
  const stages = SFStore.getPipelineStages();
  container.innerHTML = `
    <div class="sf-kpi-grid">
      ${stages.map(s => `
        <div class="sf-kpi-card" style="border-top:3px solid ${s.color}">
          <div class="sf-kpi-label">${s.label}</div>
          <div class="sf-kpi-value">${s.count}<span style="font-size:14px;color:var(--sf-gray-500);margin-left:4px">件</span></div>
          <div class="sf-kpi-sub neutral">${formatYen(s.amount)}</div>
        </div>`).join('')}
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header">
        <div class="sf-panel-title">パイプライン全体</div>
      </div>
      <div class="sf-panel-body">
        ${renderFunnelHTML()}
      </div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header">
        <div class="sf-panel-title">ステージ別商談金額</div>
      </div>
      <div class="sf-panel-body">
        <div class="sf-chart-container"><canvas id="chartPipelineBar"></canvas></div>
      </div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header">
        <div class="sf-panel-title">進行中商談一覧</div>
      </div>
      <div class="sf-panel-body">
        <div class="sf-table-wrap">
          <table class="sf-table">
            <thead><tr>
              <th>商談名</th><th>取引先</th><th>担当</th><th>金額</th><th>ステージ</th><th>確度</th><th>完了予定</th>
            </tr></thead>
            <tbody>
              ${SFStore.opportunities.filter(o => !['closed-won','closed-lost'].includes(o.stage)).map(o => `
                <tr>
                  <td><strong>${o.name}</strong></td>
                  <td>${o.account}</td>
                  <td>${o.owner}</td>
                  <td class="amount">${formatYenFull(o.amount)}</td>
                  <td><span class="stage-badge ${o.stage}">${SFStore.getStageLabel(o.stage)}</span></td>
                  <td>${o.probability}%</td>
                  <td>${o.closeDate}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  drawPipelineBarChart();
}

// ----- Deals Page -----
function renderDeals(container) {
  const allOpps = [...SFStore.opportunities].sort((a, b) => b.amount - a.amount);
  container.innerHTML = `
    <div class="sf-tabs" id="dealTabs">
      <div class="sf-tab active" data-filter="all">すべて</div>
      <div class="sf-tab" data-filter="open">進行中</div>
      <div class="sf-tab" data-filter="closed-won">受注</div>
      <div class="sf-tab" data-filter="closed-lost">失注</div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-body">
        <div class="sf-table-wrap">
          <table class="sf-table">
            <thead><tr>
              <th>ID</th><th>商談名</th><th>取引先</th><th>担当</th><th>金額</th><th>ステージ</th><th>確度</th><th>種別</th><th>完了予定</th>
            </tr></thead>
            <tbody id="dealsTableBody">
              ${renderDealsRows(allOpps)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.sf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.sf-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      let filtered = allOpps;
      if (filter === 'open') filtered = allOpps.filter(o => !['closed-won','closed-lost'].includes(o.stage));
      else if (filter === 'closed-won') filtered = allOpps.filter(o => o.stage === 'closed-won');
      else if (filter === 'closed-lost') filtered = allOpps.filter(o => o.stage === 'closed-lost');
      document.getElementById('dealsTableBody').innerHTML = renderDealsRows(filtered);
    });
  });
}

function renderDealsRows(opps) {
  if (opps.length === 0) return '<tr><td colspan="9" style="text-align:center;color:var(--sf-gray-500);padding:30px">該当する商談がありません</td></tr>';
  return opps.map(o => `
    <tr>
      <td>${o.id}</td>
      <td><strong>${o.name}</strong></td>
      <td>${o.account}</td>
      <td>${o.owner}</td>
      <td class="amount">${formatYenFull(o.amount)}</td>
      <td><span class="stage-badge ${o.stage}">${SFStore.getStageLabel(o.stage)}</span></td>
      <td>${o.probability}%</td>
      <td>${o.type}</td>
      <td>${o.closeDate}</td>
    </tr>`).join('');
}

// ----- Reps Page -----
function renderReps(container) {
  const reps = SFStore.getRepPerformance();
  container.innerHTML = `
    <div class="sf-kpi-grid">
      ${reps.map(r => `
        <div class="sf-kpi-card" style="border-top:3px solid ${r.color}">
          <div class="sf-kpi-label">${r.name}（${r.team}）</div>
          <div class="sf-kpi-value">${formatYen(r.wonAmount)}</div>
          <div class="sf-kpi-target">
            <div class="sf-kpi-target-label"><span>達成率</span><span>${r.attainment}%</span></div>
            <div class="sf-kpi-progress"><div class="sf-kpi-progress-bar blue" style="width:${Math.min(r.attainment, 100)}%;background:${r.color}"></div></div>
          </div>
          <div class="sf-kpi-sub neutral" style="margin-top:8px">パイプライン: ${formatYen(r.pipelineAmount)} / ${r.deals}件</div>
        </div>`).join('')}
    </div>
    <div class="sf-grid-2">
      <div class="sf-panel">
        <div class="sf-panel-header"><div class="sf-panel-title">担当者別受注比較</div></div>
        <div class="sf-panel-body"><div class="sf-chart-container"><canvas id="chartRepCompare"></canvas></div></div>
      </div>
      <div class="sf-panel">
        <div class="sf-panel-header"><div class="sf-panel-title">担当者別目標達成率</div></div>
        <div class="sf-panel-body"><div class="sf-chart-container"><canvas id="chartRepAttainment"></canvas></div></div>
      </div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header"><div class="sf-panel-title">担当者詳細</div></div>
      <div class="sf-panel-body">
        ${reps.map(r => `
          <div class="sf-rep-card">
            <div class="sf-rep-avatar" style="background:${r.color}">${r.initials.charAt(0)}</div>
            <div class="sf-rep-info">
              <div class="sf-rep-name">${r.name}</div>
              <div class="sf-rep-meta">${r.team}</div>
            </div>
            <div class="sf-rep-stats">
              <div class="sf-rep-stat"><div class="sf-rep-stat-val">${formatYen(r.wonAmount)}</div><div class="sf-rep-stat-label">受注</div></div>
              <div class="sf-rep-stat"><div class="sf-rep-stat-val">${formatYen(r.pipelineAmount)}</div><div class="sf-rep-stat-label">パイプライン</div></div>
              <div class="sf-rep-stat"><div class="sf-rep-stat-val">${r.deals}</div><div class="sf-rep-stat-label">商談数</div></div>
              <div class="sf-rep-stat"><div class="sf-rep-stat-val">${r.attainment}%</div><div class="sf-rep-stat-label">達成率</div></div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
  drawRepCompareChart();
  drawRepAttainmentChart();
}

// ----- Forecast Page -----
function renderForecast(container) {
  const fc = SFStore.getForecastData();
  const categories = [
    { label: '受注済', amount: fc.won, color: '#2e844a' },
    { label: 'コミット', amount: fc.committed, color: '#0176d3' },
    { label: 'ベストケース', amount: fc.bestCase, color: '#fe9339' },
    { label: 'パイプライン', amount: fc.pipeline, color: '#c9c9c9' },
  ];
  const maxVal = Math.max(fc.target, fc.pipeline, 1);

  container.innerHTML = `
    <div class="sf-kpi-grid">
      <div class="sf-kpi-card blue">
        <div class="sf-kpi-label">四半期目標</div>
        <div class="sf-kpi-value">${formatYen(fc.target)}</div>
      </div>
      <div class="sf-kpi-card green">
        <div class="sf-kpi-label">受注済</div>
        <div class="sf-kpi-value">${formatYen(fc.won)}</div>
        <div class="sf-kpi-sub neutral">${Math.round((fc.won / fc.target) * 100)}% 達成</div>
      </div>
      <div class="sf-kpi-card orange">
        <div class="sf-kpi-label">コミット案件</div>
        <div class="sf-kpi-value">${formatYen(fc.committed)}</div>
      </div>
      <div class="sf-kpi-card purple">
        <div class="sf-kpi-label">ベストケース</div>
        <div class="sf-kpi-value">${formatYen(fc.bestCase)}</div>
      </div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header"><div class="sf-panel-title">フォーキャスト概要</div></div>
      <div class="sf-panel-body">
        ${categories.map(c => `
          <div class="sf-forecast-row">
            <div class="sf-forecast-label">${c.label}</div>
            <div class="sf-forecast-bar-wrap">
              <div class="sf-forecast-bar" style="width:${(c.amount / maxVal) * 100}%;background:${c.color}"></div>
            </div>
            <div class="sf-forecast-value">${formatYen(c.amount)}</div>
          </div>`).join('')}
        <div class="sf-forecast-row" style="border-top:2px solid var(--sf-gray-200);margin-top:8px;padding-top:12px">
          <div class="sf-forecast-label" style="font-weight:700;color:var(--sf-red)">目標</div>
          <div class="sf-forecast-bar-wrap">
            <div class="sf-forecast-bar" style="width:${(fc.target / maxVal) * 100}%;background:var(--sf-red);opacity:0.3"></div>
          </div>
          <div class="sf-forecast-value" style="color:var(--sf-red)">${formatYen(fc.target)}</div>
        </div>
      </div>
    </div>
    <div class="sf-panel">
      <div class="sf-panel-header"><div class="sf-panel-title">フォーキャスト推移チャート</div></div>
      <div class="sf-panel-body"><div class="sf-chart-container"><canvas id="chartForecast"></canvas></div></div>
    </div>
  `;
  drawForecastChart();
}

// ----- Activity Page -----
function renderActivity(container) {
  container.innerHTML = `
    <div class="sf-kpi-grid">
      <div class="sf-kpi-card blue"><div class="sf-kpi-label">総アクティビティ</div><div class="sf-kpi-value">${SFStore.activities.length}</div></div>
      <div class="sf-kpi-card green"><div class="sf-kpi-label">コール</div><div class="sf-kpi-value">${SFStore.activities.filter(a => a.type === 'call').length}</div></div>
      <div class="sf-kpi-card purple"><div class="sf-kpi-label">ミーティング</div><div class="sf-kpi-value">${SFStore.activities.filter(a => a.type === 'meeting').length}</div></div>
      <div class="sf-kpi-card orange"><div class="sf-kpi-label">メール</div><div class="sf-kpi-value">${SFStore.activities.filter(a => a.type === 'email').length}</div></div>
    </div>
    <div class="sf-grid-2">
      <div class="sf-panel">
        <div class="sf-panel-header"><div class="sf-panel-title">アクティビティタイプ別</div></div>
        <div class="sf-panel-body"><div class="sf-chart-container"><canvas id="chartActivityType"></canvas></div></div>
      </div>
      <div class="sf-panel">
        <div class="sf-panel-header"><div class="sf-panel-title">全アクティビティログ</div></div>
        <div class="sf-panel-body">
          <div class="sf-activity-list">
            ${SFStore.activities.map(a => renderActivityItem(a)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  drawActivityTypeChart();
}

// ----- Data Import (CSV) Page -----
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = [];
    let cur = '', inQuote = false;
    for (let c = 0; c < lines[i].length; c++) {
      const ch = lines[i][c];
      if (ch === '"' && !inQuote) { inQuote = true; continue; }
      if (ch === '"' && inQuote) {
        if (lines[i][c + 1] === '"') { cur += '"'; c++; continue; }
        inQuote = false; continue;
      }
      if (ch === ',' && !inQuote) { vals.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    vals.push(cur.trim());
    if (vals.length === headers.length) rows.push(vals);
  }
  return { headers, rows };
}

const CSV_TEMPLATES = {
  opportunities: {
    label: '商談データ',
    icon: '&#128176;',
    columns: 'id, name, account, owner, amount, stage, probability, closeDate, created, type, product',
    example: 'OPP-001,株式会社ABC - ERP導入,株式会社ABC,田中太郎,4800000,closed-won,100,2026-01-15,2025-10-01,新規,ERP',
    stageHelp: 'prospect / qualification / proposal / negotiation / closed-won / closed-lost',
  },
  monthlyRevenue: {
    label: '月別売上データ',
    icon: '&#128200;',
    columns: 'month, revenue, target',
    example: '2026-01,12400000,15000000',
  },
  reps: {
    label: '営業担当者データ',
    icon: '&#128101;',
    columns: 'id, name, initials, team, quota, color',
    example: 'REP-001,田中太郎,田中,第一営業部,25000000,#0176d3',
  },
  activities: {
    label: 'アクティビティデータ',
    icon: '&#128197;',
    columns: 'id, type, rep, text, time, amount',
    example: 'ACT-001,deal,田中太郎,株式会社ABCを<strong>受注</strong>,2時間前,4800000',
    typeHelp: 'deal / meeting / call / email',
  },
};

// CSV temporary state
let csvImportState = { target: null, parsed: null };

function renderDataImport(container) {
  const dataStatus = SFStore.connected ? 'CSV取込済み' : 'デモデータ使用中';
  const statusClass = SFStore.connected ? 'connected' : 'disconnected';

  container.innerHTML = `
    <div class="sf-connection-card">
      <div class="sf-conn-status ${statusClass}">
        <div class="sf-conn-dot"></div>
        ${dataStatus}
      </div>
      <h3>CSVデータ連携</h3>
      <p>SalesforceからエクスポートしたCSVファイルをアップロードして、ダッシュボードに反映できます。</p>
    </div>

    <!-- データ種別選択 -->
    <div class="di-section">
      <h3 class="di-section-title">1. データ種別を選択</h3>
      <div class="di-card-grid">
        ${Object.entries(CSV_TEMPLATES).map(([key, t]) => `
          <button class="di-type-card ${csvImportState.target === key ? 'active' : ''}" data-target="${key}">
            <span class="di-type-icon">${t.icon}</span>
            <span class="di-type-label">${t.label}</span>
            <span class="di-type-count">${SFStore[key].length}件</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- CSV形式ガイド -->
    <div class="di-section" id="diFormatGuide" style="display:${csvImportState.target ? 'block' : 'none'}">
      <h3 class="di-section-title">2. CSVファイルをアップロード</h3>
      <div id="diGuideContent"></div>
    </div>

    <!-- プレビュー -->
    <div class="di-section" id="diPreviewSection" style="display:none">
      <h3 class="di-section-title">3. プレビュー確認</h3>
      <div id="diPreviewContent"></div>
    </div>

    <!-- 現在のデータ -->
    <div class="di-section">
      <h3 class="di-section-title">現在のデータ状況</h3>
      <div class="sf-panel">
        <div class="sf-panel-body">
          <table class="sf-table">
            <thead><tr><th>データ種別</th><th>件数</th><th>操作</th></tr></thead>
            <tbody>
              ${Object.entries(CSV_TEMPLATES).map(([key, t]) => `
                <tr>
                  <td>${t.icon} ${t.label}</td>
                  <td><strong>${SFStore[key].length}</strong>件</td>
                  <td><button class="sf-btn sf-btn-outline di-download-btn" data-download="${key}" style="font-size:12px;padding:4px 10px">CSVダウンロード</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- デモデータリセット -->
    <div class="di-section" style="text-align:center;padding-top:8px">
      <button class="sf-btn sf-btn-outline" id="diResetBtn" style="color:var(--sf-red);border-color:var(--sf-red)">デモデータにリセット</button>
    </div>
  `;

  // Show format guide if target selected
  if (csvImportState.target) showFormatGuide(csvImportState.target);

  // Type card click
  container.querySelectorAll('.di-type-card').forEach(card => {
    card.addEventListener('click', () => {
      csvImportState = { target: card.dataset.target, parsed: null };
      renderDataImport(container);
    });
  });

  // Download buttons
  container.querySelectorAll('.di-download-btn').forEach(btn => {
    btn.addEventListener('click', () => downloadCurrentCSV(btn.dataset.download));
  });

  // Reset button
  document.getElementById('diResetBtn').addEventListener('click', () => {
    if (!confirm('現在のデータをデモデータにリセットしますか？')) return;
    location.reload();
  });
}

function showFormatGuide(target) {
  const t = CSV_TEMPLATES[target];
  const guideEl = document.getElementById('diGuideContent');
  if (!guideEl) return;

  guideEl.innerHTML = `
    <div class="sf-panel">
      <div class="sf-panel-header"><div class="sf-panel-title">${t.icon} ${t.label}のCSV形式</div></div>
      <div class="sf-panel-body">
        <div class="di-format-info">
          <div class="di-format-row"><span class="di-format-label">ヘッダー行:</span><code>${t.columns}</code></div>
          <div class="di-format-row"><span class="di-format-label">データ例:</span><code>${t.example}</code></div>
          ${t.stageHelp ? `<div class="di-format-row"><span class="di-format-label">stage値:</span><code>${t.stageHelp}</code></div>` : ''}
          ${t.typeHelp ? `<div class="di-format-row"><span class="di-format-label">type値:</span><code>${t.typeHelp}</code></div>` : ''}
        </div>
        <div class="di-upload-area" id="diUploadArea">
          <div class="di-upload-icon">&#128196;</div>
          <div class="di-upload-text">CSVファイルをドラッグ＆ドロップ<br>またはクリックして選択</div>
          <input type="file" accept=".csv,text/csv" id="diFileInput" style="display:none">
        </div>
        <div id="diUploadMsg" style="margin-top:8px;font-size:13px;text-align:center"></div>
      </div>
    </div>
  `;

  const uploadArea = document.getElementById('diUploadArea');
  const fileInput = document.getElementById('diFileInput');

  uploadArea.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleCSVFile(e.dataTransfer.files[0], target);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleCSVFile(fileInput.files[0], target);
  });
}

function handleCSVFile(file, target) {
  const msg = document.getElementById('diUploadMsg');
  if (!file.name.endsWith('.csv')) {
    msg.innerHTML = '<span style="color:var(--sf-red)">CSVファイルを選択してください。</span>';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const parsed = parseCSV(e.target.result);
    if (parsed.rows.length === 0) {
      msg.innerHTML = '<span style="color:var(--sf-red)">データ行が見つかりません。ヘッダー行+データ行が必要です。</span>';
      return;
    }
    csvImportState.parsed = parsed;
    msg.innerHTML = `<span style="color:var(--sf-green)">&#10003; ${parsed.rows.length}件のデータを読み込みました。</span>`;
    showPreview(target, parsed);
  };
  reader.readAsText(file, 'UTF-8');
}

function showPreview(target, parsed) {
  const section = document.getElementById('diPreviewSection');
  const content = document.getElementById('diPreviewContent');
  if (!section || !content) return;
  section.style.display = 'block';

  const maxPreview = Math.min(parsed.rows.length, 5);
  content.innerHTML = `
    <div class="sf-panel">
      <div class="sf-panel-header"><div class="sf-panel-title">プレビュー（先頭${maxPreview}件 / 全${parsed.rows.length}件）</div></div>
      <div class="sf-panel-body" style="overflow-x:auto">
        <table class="sf-table">
          <thead><tr>${parsed.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>
            ${parsed.rows.slice(0, maxPreview).map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:16px">
      <button class="sf-btn sf-btn-primary" id="diApplyBtn">&#10003; ${parsed.rows.length}件をダッシュボードに反映</button>
      <button class="sf-btn sf-btn-outline" id="diCancelBtn">キャンセル</button>
    </div>
    <div id="diApplyMsg" style="margin-top:8px;font-size:13px;text-align:center"></div>
  `;

  document.getElementById('diApplyBtn').addEventListener('click', () => applyCSVData(target, parsed));
  document.getElementById('diCancelBtn').addEventListener('click', () => {
    csvImportState.parsed = null;
    section.style.display = 'none';
  });
}

function applyCSVData(target, parsed) {
  const msg = document.getElementById('diApplyMsg');
  const t = CSV_TEMPLATES[target];
  const expectedCols = t.columns.split(',').map(c => c.trim());

  try {
    const newData = parsed.rows.map(row => {
      const obj = {};
      expectedCols.forEach((col, i) => {
        let val = (row[i] !== undefined) ? row[i] : '';
        // Auto-convert numeric fields
        if (['amount', 'probability', 'revenue', 'target', 'quota'].includes(col)) {
          val = Number(val) || 0;
        }
        obj[col] = val;
      });
      return obj;
    });

    SFStore[target] = newData;
    SFStore.connected = true;
    SFStore.lastSync = new Date();
    updateSyncStatus();

    msg.innerHTML = `<span style="color:var(--sf-green)">&#10003; ${newData.length}件の${t.label}をダッシュボードに反映しました！</span>`;

    // Refresh the page after a short delay
    setTimeout(() => {
      csvImportState = { target: target, parsed: null };
      destroyCharts();
      renderDataImport(document.getElementById('sfPageContent'));
    }, 1200);
  } catch (err) {
    msg.innerHTML = `<span style="color:var(--sf-red)">取り込みエラー: ${err.message}</span>`;
  }
}

function downloadCurrentCSV(target) {
  const t = CSV_TEMPLATES[target];
  const cols = t.columns.split(',').map(c => c.trim());
  const data = SFStore[target];
  let csv = cols.join(',') + '\n';
  data.forEach(row => {
    csv += cols.map(c => {
      let v = row[c] !== undefined ? String(row[c]) : '';
      if (v.includes(',') || v.includes('"') || v.includes('\n')) v = '"' + v.replace(/"/g, '""') + '"';
      return v;
    }).join(',') + '\n';
  });
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${target}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}


// ========================
// Chart Drawing (Chart.js)
// ========================
function drawRevenueChart() {
  const ctx = document.getElementById('chartRevenue');
  if (!ctx) return;
  const data = SFStore.getMonthlyTrend();
  AppState.chartInstances.revenue = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.month.replace('2025-', '').replace('2026-', '')),
      datasets: [
        { label: '売上', data: data.map(d => d.revenue), backgroundColor: 'rgba(1,118,211,0.7)', borderRadius: 4, order: 2 },
        { label: '目標', data: data.map(d => d.target), type: 'line', borderColor: '#ea001e', borderDash: [5, 4], borderWidth: 2, pointRadius: 0, fill: false, order: 1 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => formatYen(v), font: { size: 10 } } }, x: { ticks: { font: { size: 10 } } } },
    },
  });
}

function drawRepBarChart() {
  const ctx = document.getElementById('chartRepBar');
  if (!ctx) return;
  const reps = SFStore.getRepPerformance();
  AppState.chartInstances.repBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: reps.map(r => r.name),
      datasets: [
        { label: '受注額', data: reps.map(r => r.wonAmount), backgroundColor: reps.map(r => r.color), borderRadius: 4 },
        { label: 'パイプライン', data: reps.map(r => r.pipelineAmount), backgroundColor: reps.map(r => r.color + '44'), borderRadius: 4 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => formatYen(v), font: { size: 10 } } } },
    },
  });
}

function drawProductChart() {
  const ctx = document.getElementById('chartProduct');
  if (!ctx) return;
  const products = SFStore.getProductBreakdown();
  const colors = ['#0176d3', '#7526c6', '#2e844a', '#fe9339', '#ea001e', '#c9c9c9'];
  AppState.chartInstances.product = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: products.map(p => p.name),
      datasets: [{ data: products.map(p => p.amount), backgroundColor: colors.slice(0, products.length), borderWidth: 2, borderColor: '#fff' }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.4,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
        tooltip: { callbacks: { label: ctx => ctx.label + ': ' + formatYenFull(ctx.raw) } },
      },
    },
  });
}

function drawPipelineBarChart() {
  const ctx = document.getElementById('chartPipelineBar');
  if (!ctx) return;
  const stages = SFStore.getPipelineStages();
  AppState.chartInstances.pipelineBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stages.map(s => s.label),
      datasets: [{ label: '金額', data: stages.map(s => s.amount), backgroundColor: stages.map(s => s.color), borderRadius: 6 }],
    },
    options: {
      responsive: true, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { callback: v => formatYen(v) } } },
    },
  });
}

function drawRepCompareChart() {
  const ctx = document.getElementById('chartRepCompare');
  if (!ctx) return;
  const reps = SFStore.getRepPerformance();
  AppState.chartInstances.repCompare = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: reps.map(r => r.name),
      datasets: [
        { label: '受注', data: reps.map(r => r.wonAmount), backgroundColor: reps.map(r => r.color), borderRadius: 4 },
        { label: 'クォータ', data: reps.map(r => r.quota), type: 'line', borderColor: '#ea001e', borderDash: [4, 3], borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#ea001e', fill: false },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => formatYen(v) } } },
    },
  });
}

function drawRepAttainmentChart() {
  const ctx = document.getElementById('chartRepAttainment');
  if (!ctx) return;
  const reps = SFStore.getRepPerformance();
  AppState.chartInstances.repAttainment = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['受注額', 'パイプライン', '商談数', '達成率'],
      datasets: reps.map(r => ({
        label: r.name,
        data: [
          (r.wonAmount / Math.max(...reps.map(x => x.wonAmount || 1))) * 100,
          (r.pipelineAmount / Math.max(...reps.map(x => x.pipelineAmount || 1))) * 100,
          (r.deals / Math.max(...reps.map(x => x.deals || 1))) * 100,
          r.attainment,
        ],
        borderColor: r.color,
        backgroundColor: r.color + '22',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: r.color,
      })),
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: { r: { beginAtZero: true, max: 100, ticks: { display: false } } },
    },
  });
}

function drawForecastChart() {
  const ctx = document.getElementById('chartForecast');
  if (!ctx) return;
  const fc = SFStore.getForecastData();
  AppState.chartInstances.forecast = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['受注済', 'コミット', 'ベストケース', 'パイプライン', '目標'],
      datasets: [{
        data: [fc.won, fc.committed, fc.bestCase, fc.pipeline, fc.target],
        backgroundColor: ['#2e844a', '#0176d3', '#fe9339', '#c9c9c9', 'rgba(234,0,30,0.3)'],
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => formatYen(v) } } },
    },
  });
}

function drawActivityTypeChart() {
  const ctx = document.getElementById('chartActivityType');
  if (!ctx) return;
  const types = { call: 0, email: 0, meeting: 0, deal: 0 };
  SFStore.activities.forEach(a => { types[a.type] = (types[a.type] || 0) + 1; });
  AppState.chartInstances.actType = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['コール', 'メール', 'ミーティング', '商談'],
      datasets: [{ data: [types.call, types.email, types.meeting, types.deal], backgroundColor: ['#2e844a', '#0176d3', '#7526c6', '#fe9339'], borderWidth: 2, borderColor: '#fff' }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
    },
  });
}


// ========================
// Sync Button
// ========================
function updateSyncStatus() {
  const statusEl = document.getElementById('sfSyncStatus');
  if (statusEl) {
    statusEl.textContent = SFStore.lastSync
      ? '最終同期: ' + SFStore.lastSync.toLocaleTimeString('ja-JP')
      : 'デモデータ表示中';
  }
}

function handleSync() {
  const btn = document.getElementById('sfSyncBtn');
  if (!btn) return;
  btn.classList.add('syncing');
  btn.disabled = true;
  setTimeout(() => {
    SFStore.lastSync = new Date();
    btn.classList.remove('syncing');
    btn.disabled = false;
    updateSyncStatus();
    destroyCharts();
    renderPage(AppState.currentPage);
  }, 1500);
}


// ========================
// Mobile Menu
// ========================
function initMobileMenu() {
  const toggle = document.getElementById('sfMenuToggle');
  const sidebar = document.getElementById('sfSidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove('open');
      }
    });
  }
}


// ========================
// Init
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  document.querySelectorAll('.sf-nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('sfSidebar');
      if (sidebar) sidebar.classList.remove('open');
      navigate(item.dataset.page);
    });
  });

  // Sync button
  const syncBtn = document.getElementById('sfSyncBtn');
  if (syncBtn) syncBtn.addEventListener('click', handleSync);

  // Date display
  const dateEl = document.getElementById('sfCurrentDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
  }

  initMobileMenu();
  updateSyncStatus();
  navigate('dashboard');
});
