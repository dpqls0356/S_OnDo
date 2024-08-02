package com.clio.ondo.global.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.clio.ondo.domain.counselor.repository.CounselorRepository;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.global.auth.CounselorDetailsServiceImpl;
import com.clio.ondo.global.auth.MemberDetailsServiceImpl;
import com.clio.ondo.global.auth.OAuth.CustomOAuth2UserService;
import com.clio.ondo.global.auth.OAuth.OAuth2SuccessHandler;
import com.clio.ondo.global.auth.jwtUtil.JwtAccessDeniedHandler;
import com.clio.ondo.global.auth.jwtUtil.JwtAuthenticationEntryPoint;
import com.clio.ondo.global.auth.jwtUtil.JwtFilter;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final MemberRepository memberRepository;
	private final CounselorRepository counselorRepository;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private static final String[] AUTH_WHITELIST = {
		"/api/v1/member/join",
		"/api/v1/member/login",
		"/api/v1/member/reissue",
		"/api/v1/member/oauth-success",
		"/api/v1/counselor/login"
	};

	@Bean
	public DaoAuthenticationProvider memberAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(new MemberDetailsServiceImpl(memberRepository));
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public DaoAuthenticationProvider counselorAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(new CounselorDetailsServiceImpl(counselorRepository));
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean(name = "memberAuthenticationManager")
	public AuthenticationManager memberAuthenticationManager(
		AuthenticationConfiguration authenticationConfiguration
	) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean(name = "counselorAuthenticationManager")
	public AuthenticationManager counselorAuthenticationManager(
		AuthenticationConfiguration authenticationConfiguration
	) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// @Bean
	// public AuthenticationManager authenticationManager(
	// 	AuthenticationConfiguration authenticationConfiguration
	// ) throws Exception {
	// 	return authenticationConfiguration.getAuthenticationManager();
	// }




	@Bean
	@Order(1)
	public SecurityFilterChain memberFilterChain(HttpSecurity http) throws Exception {
		http
			.authenticationProvider(memberDaoAuthenticationProvider())
			.httpBasic(AbstractHttpConfigurer::disable)
			.csrf(AbstractHttpConfigurer::disable)
			.cors(Customizer.withDefaults())
			.formLogin(AbstractHttpConfigurer::disable)
			.logout(AbstractHttpConfigurer::disable)
			.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeRequests((authorize) -> authorize
				.requestMatchers(AUTH_WHITELIST)
				.permitAll()
				.anyRequest().authenticated())
			.oauth2Login(oauth ->
				oauth.userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
					.successHandler(oAuth2SuccessHandler)
			)
			.exceptionHandling((exceptionHandling) -> exceptionHandling
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler))
			.addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	@Order(2)
	public SecurityFilterChain counselorFilterChain(HttpSecurity http) throws Exception {
		http
			.authenticationProvider(counselorDaoAuthenticationProvider())
			.httpBasic(AbstractHttpConfigurer::disable)
			.csrf(AbstractHttpConfigurer::disable)
			.cors(Customizer.withDefaults())
			.formLogin(AbstractHttpConfigurer::disable)
			.logout(AbstractHttpConfigurer::disable)
			.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeRequests((authorize) -> authorize
				.requestMatchers(AUTH_WHITELIST)
				.permitAll()
				.anyRequest().authenticated())
			.exceptionHandling((exceptionHandling) -> exceptionHandling
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler))
			.addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	DaoAuthenticationProvider memberDaoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(new MemberDetailsServiceImpl(memberRepository));
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	DaoAuthenticationProvider counselorDaoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(new CounselorDetailsServiceImpl(counselorRepository));
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(List.of("http://localhost:5173"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}