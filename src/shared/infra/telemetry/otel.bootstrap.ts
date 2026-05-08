/**
 * OpenTelemetry bootstrap — must be the FIRST import in main.ts so the SDK
 * can patch Node.js modules before any application code loads them.
 *
 * Signal flow:
 *   App (OTEL SDK) ──OTLP──▶ OpenTelemetry Collector ──▶ [Datadog | Elastic | New Relic | Jaeger | …]
 *
 * All configuration is driven by environment variables so the same binary
 * can emit to any OTLP-compatible backend without a code change:
 *
 *   OTEL_ENABLED=true
 *   OTEL_SERVICE_NAME=my-service
 *   OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
 *   OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <token>
 *
 * Backend-specific routing lives in otel-collector-config.yaml.
 */

import { NodeSDK, metrics as sdkMetrics } from '@opentelemetry/sdk-node'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'

const { PeriodicExportingMetricReader } = sdkMetrics

const isEnabled = process.env.OTEL_ENABLED === 'true'

if (isEnabled) {
  const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318'

  const otlpHeaders: Record<string, string> = {}
  if (process.env.OTEL_EXPORTER_OTLP_HEADERS) {
    for (const pair of process.env.OTEL_EXPORTER_OTLP_HEADERS.split(',')) {
      const [key, ...rest] = pair.split('=')
      if (key) otlpHeaders[key.trim()] = rest.join('=').trim()
    }
  }

  const resource = resourceFromAttributes({
    'service.name': process.env.OTEL_SERVICE_NAME ?? 'nest-app',
    'service.version': process.env.npm_package_version ?? '1.0.0',
    'deployment.environment': process.env.NODE_ENV ?? 'production',
  })

  const traceExporter = new OTLPTraceExporter({
    url: `${otlpEndpoint}/v1/traces`,
    headers: otlpHeaders,
  })

  const metricExporter = new OTLPMetricExporter({
    url: `${otlpEndpoint}/v1/metrics`,
    headers: otlpHeaders,
  })

  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: parseInt(process.env.OTEL_METRIC_EXPORT_INTERVAL ?? '30000', 10),
  })

  const sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReader,
    instrumentations: [
      getNodeAutoInstrumentations({
        // fs instrumentation produces extreme noise — disable by default
        '@opentelemetry/instrumentation-fs': { enabled: false },
        // DNS traces add little value for most services
        '@opentelemetry/instrumentation-dns': { enabled: false },
      }),
    ],
  })

  sdk.start()

  process.on('SIGTERM', () => {
    sdk.shutdown().catch((err: unknown) => console.error('OTEL shutdown error', err))
  })
}
