---
author: VirtoCommerce
category: technical
date: '2019-01-25'
permalink: blog/virtocommerce-product-release-notes-february-2019
main-image: ../../assets/images/blog/virtocommerce-february-2019-release-notes.png
tags:
- release
- platform
- virtocommerce
title: Virto Commerce Product Release Notes February 2019
excerpt: Virto Commerce development in Q3-Q4 of 2018 focused on improving several areas including key features, maintainability, customer-drive enhancements, as well as security and performance speed.
---
### <dfn>Virto Commerce Product Release Notes February 2019</dfn>

<u>
    <strong>Overview of Recent Product Releases</strong>
</u>
<p>
    Virto Commerce development in Q3-Q4 of 2018 focused on improving several areas including key
    features, maintainability, customer-drive enhancements, as well as security and performance
    speed.
</p>
<img src="/assets/images/blog/virtocommerce-2018-platform-enhancements.png" />
<u>
    <strong>Features: What’s new in Virto Commerce?</strong>
</u>
<p>
    The latest feature additions focus on Catalog Management and Order Management – comprising
    35% of new functionality in this release. The enhancements increase the platform flexibility and
    suitability for companies of any size and industry. Feature improvements include:
</p>
<strong>Order Management improvements:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>Marketing module improvements for promotions/rewards management, new conditions for promotions, ability to apply multiple coupons on checkout etc.</li>
    <li>Price management was improved: active period for prices (from/till), additional prices control properties;</li>
    <li>Extended integration with Avalara Tax automation service and improved payment gateways, per customer-enhancement request;</li>
    <li>Data export/import functionality now supports processing of even larger amounts of data</li>
</ul>
<strong>Catalog Management improvements:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>Search and filtering functionality improved significantly in the product catalog to be faster, with wider search reach;</li>
    <li>Azure search integration was extended.</li>
</ul>
<strong>GDPR related improvements:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>New history tracking of contact data changes</li>
    <li>Moving towards transparency of personal data management.</li>
</ul>
<u>
    <strong>Maintainability: How has platform maintainability improved?</strong>
</u>
<p>
    The latest Virto platform enhancements reduce the cost of implementation and the cost of
    ownership for our customers. Approximately 27% of our release focused on improvements in
    maintainability.
</p>
<p>
    A highlighted improvement is an <u>ASP.NET</u> Core update to 2.1.6 version in the Storefront core.
</p>
<p>The update includes:</p>
<ol style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>Settings were changed according to a <u>new approach</u> recommended by <u>ASP.NET</u> Core;</li>
    <li>Authentication and authorization was completely rewritten according to using <u>ASP.NET Identity Core</u>;</li>
    <li>Default <u>ASP.NET</u> Core <u>in-memory caching</u> completely replaced the <u>CacheManager</u> used before;</li>
    <li>New more selective cache invalidation based on usage of CancellationChangeToken and strongly typed cache regions allows to display always actual content without performance loss;</li>
</ol>
<p>
    You can see the full list of improvements on <u>GitHub</u>
</p>
<u>
    <strong>Performance and Security: What’s new?</strong>
</u>
<strong>System Speed Improvements:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>Parallel requests processing in the Storefront core was improved;</li>
    <li>Major performance and memory usage improvements in the Catalog module due to excluding pre-loading of the properties dictionary values;</li>
    <li>Improved API and services methods to allow to manage fullness of resulting member object graph, optimized SQL queries for data loading in the Customer module;</li>
    <li>Improved CRUD operations performance in the Order module;</li>
</ul>
<strong>Security Improvements:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li>Integration with Azure Active Directory authentication (SSO) was added</li>
    <li>Cookie based authentication replaced with a token barrier authorization</li>
    <li>HSTS policy was added, the platform run in iframe was disabled to prevent ClickJacking attacks</li>
</ul>
<u>
    <strong>FUTURES: What is Coming Soon?</strong>
</u>
<strong>Virto Commerce Platform Core 3.0 is expected to be released in 2019.</strong>
<p>
    Virto Commerce continuously invests in the platform and align with the highest Microsoft
    enterprise software standards. The next version of the Virto Commerce platform core will provide
    improved security and maintainability for our customers by reducing cost of ownership and security
    risks.
</p>
<strong>Technology stack includes:</strong>
<ul style="margin-left:25px;word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;">
    <li><u>ASP.NET</u> Core 2.1.6 as base platform</li>
    <li>EF Core 2.1.4 as primary ORM</li>
    <li><u>ASP.NET</u> Core Identity 2.1.6 for authentication and authorization</li>
    <li>OpenIddict 2.0.0 for OAuth authorization</li>
    <li>WebPack as primary design/runtime bundler and minimizer</li>
    <li>Swashbuckle.AspNetCore.SwaggerGen for Swagger docs and UI</li>
    <li>SignalR Core for push notifications</li>
    <li>AngularJS 1.4 as primary framework for SPA</li>
    <li>HangFire 1.6.21 for run background tasks</li>
</ul>
<p>
    Read more about Virto Commerce Platform Core V3 and keep track of its progress in <u>GitHub</u>.
</p>
<p><a href="/assets/files/virtocommerce-product-release-notes-2019.pdf">Open release notes in PDF file</a></p>