module.exports = {
    apps: [
        {
            name: 'bidalert-backend',
            script: './backend/server.js',
            cwd: './',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 5000
            },
            error_file: './backend/logs/error.log',
            out_file: './backend/logs/out.log',
            log_file: './backend/logs/combined.log',
            time: true
        },
        {
            name: 'bidalert-frontend',
            script: 'npm',
            args: 'start',
            cwd: './bid2alert-nextjs',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            error_file: './bid2alert-nextjs/logs/error.log',
            out_file: './bid2alert-nextjs/logs/out.log',
            log_file: './bid2alert-nextjs/logs/combined.log',
            time: true
        }
    ]
};
