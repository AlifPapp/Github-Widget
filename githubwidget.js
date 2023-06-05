function appendToWidget(a, b, c, d) {
	a = document.querySelector(a);
	b = document.createElement(b);
	if (d) b.innerHTML = d;
	if (c) b.className += c;
	a.appendChild(b)
}

function getJSON(a, b) {
	var c = new XMLHttpRequest;
	c.open("GET", a, !0);
	c.onload = function () {
		if (200 === c.status) {
			var a = JSON.parse(c.responseText);
			b(a)
		}
	};
	c.send()
}

function ready(a) {
	"loading" != document.readyState ? a() : document.addEventListener("DOMContentLoaded", a)
}

function start() {
	var html = '<div class="gh-widget-container" id="heading"> <div class="gh-widget-item gh-widget-photo"></div> <div class="gh-widget-item gh-widget-personal-details"></div></div><hr class="gh-widget-hr"><div class="gh-widget-container gh-widget-stats"></div><hr class="gh-widget-hr"><div class="gh-widget-container"> <div class="gh-widget-item gh-widget-heading">Top repositories</div></div><div class="gh-widget-repositories"></div><hr class="gh-widget-hr"><div class="gh-widget-container" id="footer"> <div class="gh-widget-item gh-widget-follow"></div> <div class="gh-widget-item gh-widget-active-time"></div></div>'
	var styles = '#heading{background-color:#161B22}.full-name,.bio,.stat-name,.count,.gh-widget-link,.gh-widget-link2{color:#F0F6FC;font-family:"Segoe UI"}.full-name{font-weight:600}.gh-widget-stats,.names,.language,.stars{background-color:#0D1117;color:#F0F6FC}#footer{background-color:#010409}.gh-widget-link,.gh-widget-link2,.follow-button{text-decoration:none;color:#F0F6FC}.gh-widget-link:hover{text-decoration:underline;color:#1881FD}.gh-widget-link2:hover{color:#dbeaf8}.gh-widget-container{display:flex;flex-direction:row;flex-wrap:no-wrap;align-items:center;justify-content:center;background-color:#0D1117;color:#F0F6FC;font-family:"Segoe UI"}.github-widget{border:1px solid #010409;max-width:350px;border-radius:.3rem}.gh-widget-item{flex:1;text-align:center;padding:10px}.gh-widget-repositories .language{text-align:left}.gh-widget-repositories .language div,.gh-widget-repositories .stars div{padding:5px 0}.gh-widget-photo img{border-radius:100%;max-width:90px}.gh-widget-personal-details{flex:6}.gh-widget-personal-details .full-name{font-size:1.5em;line-height:1.5em}.gh-widget-personal-details .location{font-size:.8em}.gh-widget-stats .count{font-size:1.2em;font-weight:700}.gh-widget-repositories .names{flex:2;text-align:left}.gh-widget-repositories .names div{padding:5px 0;text-overflow:ellipsis}.gh-widget-active-time{flex:4;font-size:.8em}.gh-widget-heading{font-weight:400;font-size:1.1em;background-color:#0D1117;color:#F0F6FC}hr.gh-widget-hr{border:0;border-bottom:1px solid #30363D;margin:0}.gh-widget-follow button{width:100%;height:2em;border:none;background-color:#238636;border-radius:.3rem}.gh-widget-follow button:hover{background-color:#2EA043}.gh-widget-photo,.gh-widget-follow{flex:2}'
	
	appendToWidget("body", "style", "", styles);
	for (var a = document.querySelectorAll(".github-widget"), b = 0; b < a.length; b++) {
		var c = a[b];
		c.setAttribute("id", "widget" + b);
		appendToWidget("#widget" + b, "div", "", html);
		d = c.dataset.toprepos
		if (d > 10){
			d = 10
		}
		c = c.dataset.username;
		fetchRepos(c, "#widget" + b, d);
		fetchUserDetails(c, "#widget" + b)
	}
}
ready(start);

function fetchRepos(a, b, c) {
	getJSON("https://api.github.com/users/" + a + "/repos", function (a) {
		updateRepoDetails(topRepos(a, c), b);
		updateLastPush(lastPushedDay(a), b)
	})
}

function fetchUserDetails(a, b) {
	getJSON("https://api.github.com/users/" + a, function (a) {
		updateUserDetails(a, b)
	})
}

function updateLastPush(a, b) {
	appendToWidget(b + " .gh-widget-active-time", "span", "", "Last active: " + (a ? a + " day(s) ago" : "Today"))
}

function lastPushedDay(a) {
	for (var b = new Date, c, d = 9999999999999, e = 0; e < a.length; e++) {
		var f = new Date(a[e].pushed_at);
		b - f < d && (c = f, d = b - f)
	}
	return Math.floor((b - c) / 864E5)
}

function updateUserDetails(a, b) {
	appendToWidget(b + " .gh-widget-personal-details", "div", "full-name", '<a target="new" class="gh-widget-link2" href="' + a.html_url + '" >' + a.name + '</a>');
	a.bio && appendToWidget(b + " .gh-widget-personal-details", "div", "bio", a.bio);
	a.location && appendToWidget(b + " .gh-widget-personal-details", "div", "location", "⚲ " + a.location);
	appendToWidget(b + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + a.followers + '</div><div class="stat-name">Followers</div>');
	appendToWidget(b + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + a.following + '</div><div class="stat-name">Following</div>');
	appendToWidget(b + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + a.public_repos + '</div><div class="stat-name">Repositories</div>');
	appendToWidget(b + " .gh-widget-photo", "span", "", '<img src="' + a.avatar_url + '">');
	appendToWidget(b + " .gh-widget-follow", "button", "", '<a class="follow-button" target="new" href="' + a.html_url + '">Follow</a>')
}

function updateRepoDetails(a, b) {
	for (var c = 0; c < a.length; c++) appendToWidget(b + " .gh-widget-repositories", "div", "gh-widget-container", '<div class="gh-widget-item names"><div><a class="gh-widget-link" target="new" href="' + a[c].repoUrl + '">' + a[c].name + '</a></div></div><div class="gh-widget-item language"><div>' + (a[c].language ? a[c].language : "Unknown") + '</div></div><div class="gh-widget-item stars"><div>⭐' + a[c].stars + "</div></div>")
}

function topRepos(a, c) {
	a.sort(function (a, b) {
		return a.stargazers_count === b.stargazers_count ? 0 : a.stargazers_count > b.stargazers_count ? -1 : 1
	});
	a = a.slice(0, c);
	var b = [],
		c;
	for (c in a) {
		var d = a[c];
		b.push({
			name: d.name,
			stars: d.stargazers_count,
			language: d.language,
			repoUrl: d.html_url
		})
	}
	return b
};
