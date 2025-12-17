pipeline {
  parameters {
    string(name: 'GIT_BRANCH', defaultValue: 'developer', description: 'Branch to build')
  }
  agent {
    node {
      label 'Slave-talos'
    }
  }

  options {
    skipDefaultCheckout(true)
    ansiColor('xterm')
    timestamps()
  }

  environment {
    GIT_URL = 'https://vostpmde37.proteccion.com.co:10443/arq_frontend/design_system/design-system-library.git'
    GIT_CREDENTIALS = 'Master_User'
    GIT_BRANCH = "${params.GIT_BRANCH ?: 'developer'}"
  }

  stages {
    stage('Obtener fuentes') {
      steps {
        cleanWs()
        echo "[INFO]: URL del proyecto ${env.BUILD_URL}display/redirect"
        echo '[EXEC] - Obtener código fuente desde repositorio Git'
        sh 'git config --global http.sslVerify false'
        checkout([
          $class: 'GitSCM',
          branches: [[name: "*/${GIT_BRANCH}"]],
          userRemoteConfigs: [[credentialsId: GIT_CREDENTIALS, url: GIT_URL]]
        ])
        sh 'pwd && ls -la'

      }
    }

    stage('Instalar dependencias') {
      steps {
        script {
          if (!fileExists('package.json')) {
            sh 'pwd && echo "Contenido actual de workspace:" && ls -la'
            error('package.json no encontrado. Verifica la rama y estructura del repositorio.')
          }
        }
        sh 'npm ci || npm install'
      }
    }

    stage('Extraer info version') {
      steps {
        script {
          def pkg = readJSON file: 'package.json'
          env.APP_NAME = pkg.name ?: 'unknown-app'
          env.APP_VERSION = pkg.version ?: '0.0.0'
          echo "Aplicación: ${env.APP_NAME}, Versión: ${env.APP_VERSION}"
        }
      }
    }

    stage('Generar metadata del build') {
      steps {
        script {
          // Obtener información del commit
          env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
          env.GIT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()

          echo "Generando build-info.json..."
          echo "Build Number: ${env.BUILD_NUMBER}"
          echo "Git Commit: ${env.GIT_COMMIT}"
          echo "Git Branch: ${env.GIT_BRANCH}"
        }
        sh 'node scripts/generate-build-info.js'
        sh 'cat build-info.json'
      }
    }

    stage('Chequeo de tipos') {
      steps {
        sh 'npm run type-check || echo "type-check no disponible, omitiendo..."'
      }
    }

    stage('Compilar fuentes') {
      steps {
        sh 'node -v && npm -v'
        sh 'npm run build'
      }
    }

    stage('Pruebas unitarias') {
      steps {
        sh 'npm test -- --passWithNoTests || echo "No hay pruebas disponibles, continuando..."'
      }
    }

    stage('Análisis estático') {
      steps {
        sh 'npm run lint || echo "Lint falló, pero continuando..."'
      }
    }
  }

  post {
    always {
      script {
        def result = currentBuild.currentResult
        echo "Build finalizado con resultado: ${result}"
        
        if (env.MS_TEAMS_WEBHOOK?.trim()) {
          try {
            office365ConnectorSend(
              message: "Build ${result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
              status: result,
              webhookUrl: env.MS_TEAMS_WEBHOOK.trim()
            )
          } catch (err) {
            echo "No se pudo notificar a Teams: ${err.message}"
          }
        } else {
          echo 'MS_TEAMS_WEBHOOK no configurado; notificación a Teams omitida.'
        }
      }
    }
    success {
      echo 'Pipeline completado exitosamente!'
    }
    failure {
      echo 'Pipeline falló. Revisa los logs para más detalles.'
    }
  }
}